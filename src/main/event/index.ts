import { ipcMain } from 'electron';
import { WindowCreator } from '../browserWindow';
import { WindowEvent } from './window';
import { ConfigEvent } from './config';
import { ApplicationDataManager } from '../applicationData';

export class EventRegister {
  applicationDataManager: ApplicationDataManager | null = null;
  windowCreator: WindowCreator | null = null;
  windowEvent: WindowEvent | null = null;
  configEvent: ConfigEvent | null = null;

  constructor(
    windowCreator: WindowCreator,
    applicationDataManager: ApplicationDataManager
  ) {
    this.windowCreator = windowCreator;
    this.applicationDataManager = applicationDataManager;
    this.windowEvent = new WindowEvent(this.windowCreator);
    this.configEvent = new ConfigEvent(this.applicationDataManager);
  }

  init() {
    this.bindEvent(this.windowEvent);
    this.bindEvent(this.configEvent)
  }

  bindEvent(ctor: any) {
    const events = Object.getOwnPropertyNames(
      Object.getPrototypeOf(ctor)
    ).filter(
      (propertyName) =>
        propertyName !== 'constructor' &&
        typeof (ctor as any)[propertyName] === 'function'
    );

    events.map((name) => {
      ipcMain.on(name, (ctor as any)[name].bind(ctor));
    });
  }
}
