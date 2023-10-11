import { Tooltip, Unstable_Grid2, styled } from '@mui/material';
import {
  DisplayBlockIcon,
  DisplayFlexIcon,
  DisplayGridIcon,
  DisplayInlineBlockIcon,
  DisplayNoneIcon,
  DisplayInlineIcon,
} from '@/components/CustomIcons/icon';
import { ReactNode, cloneElement } from 'react';
import { useSafeState } from 'ahooks';
import { TDisplay } from 'root/renderer/src/materials/types/style';

const Grid = styled(Unstable_Grid2)({
  svg: {
    width: '14px',
    height: '14px',
    cursor: 'pointer',
  },
});

const IconMap: Record<TDisplay, ReactNode> = {
  block: <DisplayBlockIcon />,
  flex: <DisplayFlexIcon />,
  grid: <DisplayGridIcon />,
  'inline-block': <DisplayInlineBlockIcon />,
  inline: <DisplayInlineIcon />,
  none: <DisplayNoneIcon />,
};

type TProps = {
  display: TDisplay;
  onChange: (value: string) => void;
};
export function LayoutPannel(props: TProps) {
  const [activeIcon, setActiveIcon] = useSafeState<TDisplay>(props.display);

  return (
    <Grid container spacing={2}>
      <Grid xs={3}>排布</Grid>
      {Object.keys(IconMap).map((name) => (
        <Tooltip key={name} title={'display-' + name} placement="top" arrow>
          <Grid>
            {cloneElement((IconMap as any)[name], {
              color: activeIcon === name ? 'primary' : '',
              onClick() {
                props.onChange(name);
                setActiveIcon(name as TDisplay);
              },
            })}
          </Grid>
        </Tooltip>
      ))}
    </Grid>
  );
}
