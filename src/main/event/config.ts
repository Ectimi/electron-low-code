import { IpcMainEvent } from 'electron';
import { EventName } from 'src/types/EventName';
import { ApplicationDataManager } from '../applicationData';
import { IProjectItem } from '../template/applicationConfigTemplate';
import { IEventBeforClose } from 'root/types/ParamsType';

export class ConfigEvent {
  applicationDataManager: ApplicationDataManager | null = null;

  constructor(applicationDataManager: ApplicationDataManager) {
    this.applicationDataManager = applicationDataManager;
  }

  async [EventName.BEFORE_CLOSE](event: IpcMainEvent, data: IEventBeforClose) {
    if (this.applicationDataManager) {
      const config = await this.applicationDataManager.readConfigFile();
      const recentlyProjects = [...config!.recentlyProjects];
      if (data.projectName) {
        const filterProject = (item: IProjectItem) =>
          item.projectName === data.projectName &&
          item.projectPath === data.projectPath;
        const findProject = recentlyProjects.filter(filterProject)[0];
        if (findProject) {
          const index = recentlyProjects.findIndex(filterProject);
          recentlyProjects.splice(index, 1);
          recentlyProjects.unshift(findProject);
          config!.recentlyProjects = recentlyProjects;
        }
      }
      config!.lastClosePath = data.lastClosePath || '';
      await this.applicationDataManager.writeConfigFile(config!);
    }
    event.returnValue = EventName.BEFORE_CLOSE;
  }
}
