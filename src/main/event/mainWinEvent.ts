import { ipcMain, BrowserWindow, app } from 'electron';
import { EventName } from 'src/types/EventName';
import { WindowCreator } from '../browserWindow';

export class EventRegister {
  windowCreator: WindowCreator | null = null;

  constructor(windowCreator: WindowCreator) {
    this.windowCreator = windowCreator;
  }

  init() {
    ipcMain.on(EventName.WIN_MINIMIZE, (event) => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.minimize();
      }
      event.returnValue = 'minimized';
    });

    ipcMain.on(EventName.WIN_MAXIMIZE, (event) => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        if (focusedWindow.isMaximized()) {
          focusedWindow.unmaximize();
          event.returnValue = 'unmaximized';
        } else {
          focusedWindow.maximize();
          event.returnValue = 'maximized';
        }
      }
    });

    ipcMain.on(EventName.WIN_CLOSE, (event) => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.close();
      }
      if (BrowserWindow.getAllWindows().length === 1) {
        app.quit();
      }
      event.returnValue = 'close';
    });

    ipcMain.on(EventName.NEW_WINDOW, (event) => {
      if (this.windowCreator) {
        const broswerWindow = this.windowCreator.createWindow();
        broswerWindow.loadURL(
          process.argv[2] ? process.argv[2] : 'app://index.html'
        );
        event.returnValue = 'createNewWindow';
      }
    });
  }
}
