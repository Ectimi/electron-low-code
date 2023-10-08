import { FC } from 'react';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuBar, { TMenuBarProps } from '../MenuBar';
import modalStore from '@/store/modal';
import commonStore from '@/store/common';
import { EventName } from 'root/types/EventName';

const { isMac, ipcRenderer } = window.electronApi;

export const HeaderHeight = 28;

const ScHeader = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMac ? 'flex-end' : 'space-between',
  width: '100%',
  height: `${HeaderHeight}px`,
  padding: '0 10px',
  backgroundColor: 'var(--headline-color)',
  color: '#fff',
  WebkitAppRegion: 'drag',
  '.MuiIconButton-root': {
    WebkitAppRegion: 'no-drag',
  },
});

const ScTitle = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
});

export const Header: FC = () => {
  const commonStoreSnapshot = commonStore.getSnapshot();
  const template: TMenuBarProps['template'] = [
    {
      label: '文件(F)',
      accelerator: 'alt+F',
      submenu: [
        {
          label: '新建项目',
          accelerator: 'ctrl+N',
          click() {
            modalStore.toggleCreateProjectModal(true);
          },
        },
        {
          label: '新建窗口',
          accelerator: 'ctrl+shift+N',
          click() {
            ipcRenderer.sendSync(EventName.NEW_WINDOW);
          },
        },
      ],
    },
    {
      label: '帮助(H)',
      accelerator: 'alt+H',
      submenu: [
        {
          label: '关于',
          accelerator: 'ctrl+A',
          click() {
            console.log('about');
          },
        },
      ],
    },
  ];

  return (
    <ScHeader>
      {!isMac && <MenuBar template={template} />}
      <ScTitle>{commonStoreSnapshot.windowTitle || 'Low Code Editor'}</ScTitle>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="minimize"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventName.WIN_MINIMIZE);
          }}
        >
          <HorizontalRuleIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="maxsize"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventName.WIN_MAXIMIZE);
          }}
        >
          <CropSquareIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="quit"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventName.WIN_CLOSE);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </ScHeader>
  );
};
