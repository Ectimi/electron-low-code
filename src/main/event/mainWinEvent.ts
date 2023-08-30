import { ipcMain, BrowserWindow, app } from 'electron';
import { EventType } from './event.type';

export default function registerMainWinEvent(win: BrowserWindow) {
  ipcMain.on(EventType.WIN_MINIMIZE, (event) => {
    win.minimize();
    event.returnValue = 'minimized';
  });

  ipcMain.on(EventType.WIN_MAXIMIZE, (event) => {
    if (win.isMaximized()) {
      win.unmaximize();
      event.returnValue = 'unmaximized';
    } else {
      win.maximize();
      event.returnValue = 'maximized';
    }
  });

  ipcMain.on(EventType.APP_QUIT, (event) => {
    app.quit();
    event.returnValue = 'quit';
  });
}
