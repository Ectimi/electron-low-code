import { ipcMain, BrowserWindow, app } from 'electron';
import { EventName } from 'src/types/EventName';

export class EventRegister {
  win: BrowserWindow | null = null;

  constructor(win: BrowserWindow) {
    this.win = win;
  }

  init() {
    if (this.win !== null) {
      ipcMain.on(EventName.WIN_MINIMIZE, (event) => {
        this.win!.minimize();
        event.returnValue = 'minimized';
      });

      ipcMain.on(EventName.WIN_MAXIMIZE, (event) => {
        if (this.win!.isMaximized()) {
          this.win!.unmaximize();
          event.returnValue = 'unmaximized';
        } else {
          this.win!.maximize();
          event.returnValue = 'maximized';
        }
      });

      ipcMain.on(EventName.APP_QUIT, (event) => {
        app.quit();
        event.returnValue = 'quit';
      });
    }
  }
}
