import { FC } from 'react';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { EventType } from 'main/event/event.type';

export const HeaderHeight = 35;

const ScHeader = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  height: `${HeaderHeight}px`,
  padding: '0 10px',
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  WebkitAppRegion: 'drag',
  '.MuiIconButton-root': {
    WebkitAppRegion: 'no-drag',
  },
}));

const { ipcRenderer } = window.electronApi;

export const Header: FC = () => {
  return (
    <ScHeader>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="minimize"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventType.WIN_MINIMIZE);
          }}
        >
          <HorizontalRuleIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="maxsize"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventType.WIN_MAXIMIZE);
          }}
        >
          <CropSquareIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="quit"
          size="small"
          color="inherit"
          onClick={() => {
            ipcRenderer.sendSync(EventType.APP_QUIT);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </ScHeader>
  );
};
