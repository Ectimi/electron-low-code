import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './mainWindow';
import { CustomScheme } from './CustomScheme';
import { buildMenu } from './menu';
import registerMainWinEvent from './event/mainWinEvent';
import registerGlobalShortcut from './shortcut';
import registerApi from './api';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const onReady = (mainWindow: BrowserWindow) => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createMainWindow();
    buildMenu(mainWindow);
    registerMainWinEvent(mainWindow);
    registerGlobalShortcut(mainWindow);
    registerApi(mainWindow);

    if (process.argv[2]) {
      mainWindow.loadURL(process.argv[2]);
      mainWindow.webContents.openDevTools({ mode: 'undocked' });
    } else {
      CustomScheme.registerScheme();
      mainWindow.loadURL(`app://index.html`);
    }
  }
};

const startup = () => {
  const gotTheLock = app.requestSingleInstanceLock();
  let mainWindow: BrowserWindow;
  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
    app.whenReady().then(() => onReady(mainWindow));
  }
};

startup()
