import { BrowserWindow } from 'electron';
import { listen } from '../ipc';
import ProjectApi from './project';
import { ApplicationDataManager } from '../applicationData';

export class ApiResgiter {
  mainWindow: BrowserWindow | null = null;
  applicationDataManager: ApplicationDataManager | null = null;
  projectApi: ProjectApi | null = null;

  constructor(mainWindow: BrowserWindow,applicationDataManager: ApplicationDataManager) {
    this.mainWindow = mainWindow;
    this.applicationDataManager = applicationDataManager
    this.projectApi = new ProjectApi(this.mainWindow,this.applicationDataManager);
  }

  async init() {
    const projectMethods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.projectApi!)
    ).filter(
      (propertyName) =>
        propertyName !== 'constructor' &&
        typeof (this.projectApi! as any)[propertyName] === 'function'
    );

    projectMethods.map((name) => {
      listen(name, (this.projectApi! as any)[name].bind(this.projectApi));
    });
  }
}
