import {
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  MenuItem as MItem,
  Paper,
  Popper,
  styled,
} from '@mui/material';
import mousetrap from 'mousetrap';
import { useEffect, useRef, useState } from 'react';
import { capitalizeFirstLetter } from '@/utils';

export interface IMenuItem {
  label: string;
  accelerator?: string;
  click?: (...args: any) => void;
  submenu?: IMenuItem[];
}

const { isMac } = window.electronApi;

function getShortcutKeyText(accelerator: string) {
  const [modifierKey, key] = accelerator.split('+');
  const bindKey = modifierKey
    .toLocaleLowerCase()
    .split('or')
    .map(
      (modifier) =>
        capitalizeFirstLetter(modifier) + '+' + key.toLocaleUpperCase()
    );

  if (bindKey.length > 1) {
    for (let i = 0; i < bindKey.length; i++) {
      const item = bindKey[i].toLocaleLowerCase();
      if (!isMac && (item.includes('cmd') || item.includes('command'))) {
        bindKey.splice(i, 0);
        i--;
      }
    }
  }
  return bindKey[0];
}

function bindShortcut(accelerator?: string, fn?: IMenuItem['click']) {
  if (accelerator) {
    const [modifierKey, key] = accelerator.split('+');
    const bindKey = modifierKey
      .toLocaleLowerCase()
      .split('or')
      .map((modifier) => modifier + '+' + key.toLocaleLowerCase());

    mousetrap.bind(bindKey, () => fn && fn());

    return bindKey;
  }
}

function bindMenuShortcut(menus: IMenuItem[]) {
  const boundKeys: Array<string[]> = [];
  menus.map((item) => {
    const { accelerator, click, submenu = [] } = item;
    const bindKey = bindShortcut(accelerator, click);
    if (bindKey) {
      boundKeys.push(bindKey);
    }
    if (submenu.length > 0) {
      bindMenuShortcut(submenu);
    }
  });

  return function unbindMenuShortcut() {
    boundKeys.map((key) => mousetrap.unbind(key));
  };
}

const ScButton = styled(Button)({
  color: '#fff',
  paddingBottom: 0,
});

const ScMenuItem = styled(MItem)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '14px',
});

const MenuItem = (props: IMenuItem) => {
  const { label, accelerator, click, submenu = [] } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => {
      if (!prevOpen) {
        click && click();
      }
      return !prevOpen;
    });
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    bindShortcut(accelerator, handleToggle);
    return bindMenuShortcut(submenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScButton ref={anchorRef} onClick={handleToggle}>
        {label}
      </ScButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  onKeyDown={handleListKeyDown}
                  sx={{ minWidth: '250px' }}
                >
                  {submenu.map((item) => (
                    <ScMenuItem
                      key={item.label}
                      onClick={() => {
                        item.click && item.click();
                      }}
                    >
                      <div>{item.label}</div>
                      {item.accelerator && (
                        <div>{getShortcutKeyText(item.accelerator!)}</div>
                      )}
                    </ScMenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default MenuItem;
