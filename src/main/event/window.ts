import { BrowserWindow, IpcMainEvent, app } from 'electron';
import { EventName } from 'src/types/EventName';
import { WindowCreator } from '../browserWindow';

export class WindowEvent {
  windowCreator: WindowCreator | null = null;

  constructor(windowCreator: WindowCreator) {
    this.windowCreator = windowCreator;
  }

  [EventName.WIN_MINIMIZE](event: IpcMainEvent) {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.minimize();
    }
    event.returnValue = 'minimized';
  }

  [EventName.WIN_MAXIMIZE](event: IpcMainEvent) {
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
  }

  [EventName.WIN_CLOSE](event: IpcMainEvent){
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.close();
    }
    if (BrowserWindow.getAllWindows().length === 1) {
      app.quit();
    }
    event.returnValue = 'close';
  }

  [EventName.NEW_WINDOW](event: IpcMainEvent){
    if (this.windowCreator) {
      const broswerWindow = this.windowCreator.createWindow();
      broswerWindow.loadURL(
        process.argv[2] ? process.argv[2] : 'app://index.html'
      );
      event.returnValue = 'createNewWindow';
    }
  }
}
