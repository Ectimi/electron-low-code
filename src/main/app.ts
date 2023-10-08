import { app, BrowserWindow } from 'electron';
import { CustomScheme } from './CustomScheme';
import { WindowCreator } from './browserWindow';
import { MenuBuilder } from './menu';
import { ApiResgiter } from './api';
import { EventRegister } from './event/mainWinEvent';
import { ShortcutRegister } from './shortcut';
import { ApplicationDataManager } from './applicationData';

export default class App {
  mainWindow: BrowserWindow | null = null;

  windowCreator: WindowCreator | null = null;
  menuBuilder: MenuBuilder | null = null;
  apiRegister: ApiResgiter | null = null;
  eventRegister: EventRegister | null = null;
  shortcutRegister: ShortcutRegister | null = null;
  applicationDataManager: ApplicationDataManager | null = null;

  async startup() {
    this.runCheck();
    this.lifetimeRegister();
  }

  runCheck() {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) return app.quit();
    app.on('second-instance', this.onSecondInstance);
  }

  lifetimeRegister() {
    app.on('ready', this.onReady);
    app.on('window-all-closed', this.onWindowAllClosed);
  }

  onReady() {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.windowCreator = new WindowCreator();
      this.mainWindow = this.windowCreator.createWindow({ show: false });
      this.applicationDataManager = new ApplicationDataManager();
      this.menuBuilder = new MenuBuilder(this.mainWindow);
      this.apiRegister = new ApiResgiter(
        this.mainWindow,
        this.applicationDataManager
      );
      this.eventRegister = new EventRegister(this.windowCreator);
      this.shortcutRegister = new ShortcutRegister(this.mainWindow);

      this.menuBuilder?.build();
      this.apiRegister?.init();
      this.eventRegister?.init();
      this.shortcutRegister?.init();
      this.applicationDataManager?.init();

      if (process.argv[2]) {
        this.mainWindow.on('ready-to-show', () => this.mainWindow?.show());
        this.mainWindow!.loadURL(process.argv[2]);
        this.mainWindow!.webContents.openDevTools({ mode: 'undocked' });
      } else {
        CustomScheme.registerScheme();
        this.mainWindow!.loadURL(`app://index.html`);
      }
    }
  }

  onSecondInstance() {
    if (this.mainWindow) {
      if (this.mainWindow.isMinimized()) {
        this.mainWindow.restore();
      }
      this.mainWindow.focus();
    }
  }

  onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }
}
