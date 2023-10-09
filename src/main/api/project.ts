import fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import { ApiName } from 'root/types/ApiName';
import { returnValue, returnError } from './utils';
import { ICreateProjectParams } from 'root/types/ParamsType';
import { ApplicationDataManager } from '../applicationData';
import projectConfigTemplate from '../template/projectConfigTemplate';
import {
  IApplicationConfig,
  IProjectItem,
} from '../template/applicationConfigTemplate';

export default class ProjectApi {
  applicationDataManager: ApplicationDataManager | null = null;

  constructor(applicationDataManager: ApplicationDataManager) {
    this.applicationDataManager = applicationDataManager;
  }

  async [ApiName.SelectFolder]() {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      const result = await dialog.showOpenDialog(focusedWindow, {
        properties: ['openDirectory'],
      });

      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        return returnValue(folderPath);
      }
    }

    return returnValue('');
  }

  async [ApiName.CreateProject](data: ICreateProjectParams) {
    if (!data) return returnError('缺少参数');

    const {
      projectName = '',
      projectPath = '',
      assetFolderName = 'assets',
    } = data;
    if (projectName && projectPath) {
      const newProjectPath = path.join(projectPath, projectName);
      if (fs.existsSync(newProjectPath)) {
        return returnError('该项目名称已经存在');
      } else {
        const defaultConfig = Object.assign({}, projectConfigTemplate, {
          projectName,
          projectPath,
          assetFolderName,
        });
        try {
          const assetFolderPath = path.join(newProjectPath, assetFolderName);
          fs.mkdirSync(newProjectPath);
          fs.mkdirSync(assetFolderPath);
          fs.writeFileSync(
            path.join(newProjectPath, 'project.config.json'),
            JSON.stringify(defaultConfig, null, 2)
          );

          const applicationConfig =
            await this.applicationDataManager!.readConfigFile();

          const index = applicationConfig!.recentlyProjects.findIndex(
            (item: IProjectItem) =>
              item.projectName === data.projectName &&
              item.projectPath === newProjectPath
          );
          if (index > -1) {
            applicationConfig?.recentlyProjects.splice(index, 1);
          }
          applicationConfig?.recentlyProjects.unshift({
            projectName,
            projectPath: newProjectPath,
          });
          await this.applicationDataManager?.writeConfigFile(
            applicationConfig!
          );
          return returnValue('新建项目成功');
        } catch (error) {
          console.log('error==>', error);
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
      return returnValue(config?.recentlyProjects);
    }
    return returnValue([]);
  }

  async [ApiName.IsValidProject](projectPath: string) {
    if (!projectPath) return returnError('缺少参数');

    try {
      const configPath = path.join(projectPath, 'project.config.json');
      await fs.promises.access(configPath, fs.constants.F_OK);
      const projectConfig: any = JSON.parse(
        await fs.readFileSync(configPath, 'utf-8')
      );

      if (
        projectConfig &&
        JSON.stringify(Object.keys(projectConfig)) ===
          JSON.stringify(Object.keys(projectConfigTemplate))
      ) {
        return returnValue({
          isValid: true,
          projectName: projectConfig.projectName,
          projectPath: projectConfig.projectPath,
        });
      }
    } catch (error) {
      console.log('error', error);
      return returnValue({ isValid: false });
    }

    return returnValue({ isValid: false });
  }

  async [ApiName.GetApplicationConfig](key?: keyof IApplicationConfig) {
    const config: IApplicationConfig =
      await this.applicationDataManager!.readConfigFile()!;
    const res = key ? config[key] : config;

    return returnValue(res);
  }
}
