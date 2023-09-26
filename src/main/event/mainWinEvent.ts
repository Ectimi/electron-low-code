import { ipcMain, BrowserWindow, app } from 'electron';
import { EventName } from 'src/types/EventName';

export default function registerMainWinEvent(win: BrowserWindow) {
  ipcMain.on(EventName.WIN_MINIMIZE, (event) => {
    win.minimize();
    event.returnValue = 'minimized';
  });

  ipcMain.on(EventName.WIN_MAXIMIZE, (event) => {
    if (win.isMaximized()) {
      win.unmaximize();
      event.returnValue = 'unmaximized';
    } else {
      win.maximize();
      event.returnValue = 'maximized';
    }
  });

  ipcMain.on(EventName.APP_QUIT, (event) => {
    app.quit();
    event.returnValue = 'quit';
  });
}
