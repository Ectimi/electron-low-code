import fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import { ApiName } from 'root/types/ApiName';
import { returnValue, returnError } from './utils';
import { ICreateProjectParams } from 'root/types/ParamsType';
import { ApplicationDataManager } from '../applicationData';
import projectConfigTemplate, {
  IProjectConfig,
} from '../template/projectConfigTemplate';
import {
  IApplicationConfig,
  IProjectItem,
} from '../template/applicationConfigTemplate';
import { merge } from 'lodash';
import { isImage, isVideo } from '../utils';

export interface IRecource {
  resources: Array<{ fileName: string; filePath: string }>;
  children: Record<string, IRecource>;
}

class Recource {
  resources: IRecource['resources'] = [];
  children: IRecource['children'] = {};
}

export default class ProjectApi {
  applicationDataManager: ApplicationDataManager | null = null;
  projectConfigFileName = 'project.config.json';

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
    if (!data.projectName || !data.projectPath) return returnError('缺少参数');

    const { projectName, projectPath, assetFolderName = 'assets' } = data;
    if (projectName && projectPath) {
      const newProjectPath = path.join(projectPath, projectName);
      if (fs.existsSync(newProjectPath)) {
        return returnError('该项目名称已经存在');
      } else {
        const projectConfig = merge(projectConfigTemplate, {
          projectName,
          projectPath,
          assetFolderName,
        });
        try {
          const assetFolderPath = path.join(newProjectPath, assetFolderName);
          const imageFolderPath = path.join(
            assetFolderPath,
            projectConfig.imageFolderName
          );
          const videoFolderPath = path.join(
            assetFolderPath,
            projectConfig.videoFolderName
          );
          const fontFolderPath = path.join(
            assetFolderPath,
            projectConfig.fontFolderName
          );
          fs.mkdirSync(newProjectPath);
          fs.mkdirSync(assetFolderPath);
          fs.mkdirSync(imageFolderPath);
          fs.mkdirSync(videoFolderPath);
          fs.mkdirSync(fontFolderPath);
          fs.writeFileSync(
            path.join(newProjectPath, this.projectConfigFileName),
            JSON.stringify(projectConfig, null, 2)
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
          return returnValue(newProjectPath);
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

  async [ApiName.GetResource](dirPath: string) {
    if (!dirPath) return returnError('缺少参数');

    const projectConfig: IProjectConfig = JSON.parse(
      fs.readFileSync(path.join(dirPath, this.projectConfigFileName), 'utf-8')
    );

    const imageFolderPath = path.join(
      dirPath,
      projectConfig.assetFolderName,
      projectConfig.imageFolderName
    );
    const videoFolderPath = path.join(
      dirPath,
      projectConfig.assetFolderName,
      projectConfig.videoFolderName
    );
    const Image = new Recource();
    const Video = new Recource();

    const traverseDirectory = (
      recourse: IRecource,
      dirPath: string,
      type: 'image' | 'video'
    ) => {
      const stat = fs.statSync(dirPath);
      if (stat.isDirectory()) {
        const fileNames = fs.readdirSync(dirPath);
        fileNames.map((fileName) => {
          const filePath = path.join(dirPath, fileName);
          const fileStat = fs.statSync(filePath);
          if (fileStat.isFile()) {
            const extension = path.extname(fileName.toLowerCase());
            if (type === 'image' && isImage(extension)) {
              recourse.resources.push({ fileName, filePath });
            } else if (type === 'video' && isVideo(extension)) {
              recourse.resources.push({ fileName, filePath });
            }
          } else if (fileStat.isDirectory()) {
            if (type === 'image') {
              Image.children[fileName] = new Recource();
              traverseDirectory(Image.children[fileName], filePath, type);
            } else if (type === 'video') {
              Video.children[fileName] = new Recource();
              traverseDirectory(Video.children[fileName], filePath, type);
            }
          }
        });
      }
    };
    traverseDirectory(Image, imageFolderPath, 'image');
    traverseDirectory(Video, videoFolderPath, 'video');

    const res = { Image, Video };
    
    return returnValue(res);
  }
}
