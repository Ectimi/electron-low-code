import { listen } from '../ipc';
import ProjectApi from './project';
import WindowApi from './window';
import { ApplicationDataManager } from '../applicationData';

export class ApiResgiter {
  applicationDataManager: ApplicationDataManager | null = null;
  projectApi: ProjectApi | null = null;
  windowApi: WindowApi | null = null;

  constructor(applicationDataManager: ApplicationDataManager) {
    this.applicationDataManager = applicationDataManager;
    this.projectApi = new ProjectApi(this.applicationDataManager);
    this.windowApi = new WindowApi();
  }

  async init() {
    this.callApi(this.projectApi);
    this.callApi(this.windowApi);
  }

  callApi(ctor: any) {
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(ctor)
    ).filter(
      (propertyName) =>
        propertyName !== 'constructor' &&
        typeof (ctor as any)[propertyName] === 'function'
    );

    methods.map((name) => {
      listen(name, (ctor as any)[name].bind(ctor));
    });
  }
}
