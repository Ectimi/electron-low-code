import fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import { ApiName } from 'root/types/ApiName';
import { returnValue, returnError } from './utils';
import { ICreateProjectParams } from 'root/types/ParamsType';
import { ApplicationDataManager } from '../applicationData';

export default class ProjectApi {
  win: BrowserWindow | null = null;
  applicationDataManager: ApplicationDataManager | null = null;

  constructor(
    win: BrowserWindow,
    applicationDataManager: ApplicationDataManager
  ) {
    this.win = win;
    this.applicationDataManager = applicationDataManager;
  }

  async [ApiName.SelectFolder]() {
    if (this.win === null) return;
    const result = await dialog.showOpenDialog(this.win, {
      properties: ['openDirectory'],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      return returnValue(folderPath);
    }

    return returnValue('');
  }

  async [ApiName.CreateProject](data: ICreateProjectParams) {
    if (!data) return returnError('缺少参数');
    const { projectName = '', projectPath = '' } = data;
    if (projectName && projectPath) {
      const newProjectPath = path.join(projectPath, projectName);
      if (fs.existsSync(newProjectPath)) {
        return returnError('该项目名称已经存在');
      } else {
        const defaultConfig = {
          canvas: {
            width: 1920,
            height: 1080,
          },
          materialList: [],
        };
        try {
          fs.mkdirSync(newProjectPath);
          fs.writeFileSync(
            path.join(newProjectPath, 'project.config.json'),
            JSON.stringify(defaultConfig, null, 2)
          );
          return returnValue('新建项目成功');
        } catch (error) {
          return returnError('创建项目出错');
        }
      }
    } else {
      return returnError('参数值不能为空');
    }
  }

  async [ApiName.RecentlyProject]() {
    const config = this.applicationDataManager?.readConfigFile();
    if (config !== null) {
      return config?.recentlyProjects;
    }
    return [];
  }
}
