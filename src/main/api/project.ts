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
import { nanoid } from 'nanoid';
import type { FileData } from 'chonky';

export type FileMap<FT extends FileData = FileData> = {
  [fileId: string]: FT & { childrenIds?: string[]; parentId?: string };
};

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

    const rootFolderId = nanoid();
    const imageFolderId = nanoid();
    const videoFolderId = nanoid();
    const fileMap: FileMap = {
      [rootFolderId]: {
        id: rootFolderId,
        name: '资源库',
        isDir: true,
        childrenIds: [imageFolderId, videoFolderId],
      },
      [imageFolderId]: {
        id: imageFolderId,
        name: 'images',
        isDir: true,
        childrenIds: [],
        parentId: rootFolderId,
      },
      [videoFolderId]: {
        id: videoFolderId,
        name: 'videos',
        isDir: true,
        childrenIds: [],
        parentId: rootFolderId,
      },
    };

    const traverseDirectory = (parentId: string, dirPath: string) => {
      const stat = fs.statSync(dirPath);
      if (stat.isDirectory()) {
        const fileNames = fs.readdirSync(dirPath);
        fileNames.map((fileName) => {
          const filePath = path.join(dirPath, fileName);
          const fileStat = fs.statSync(filePath);
          const modDate = fileStat.mtime;
          const size = fileStat.size;
          if (fileStat.isFile()) {
            const ext = path.extname(fileName.toLowerCase());

            if (isImage(ext) || isVideo(ext)) {
              const id = nanoid();

              fileMap[parentId].childrenIds!.push(id);
              fileMap[id] = {
                id,
                name: fileName,
                size,
                modDate,
                parentId,
                ext,
                thumbnailUrl: isImage(ext)
                  ? `file://${filePath.replace(/\\/g, '//')}`
                  : undefined,
              };
            }
          } else if (fileStat.isDirectory()) {
            const id = nanoid();
            fileMap[parentId].childrenIds?.push(id);
            fileMap[id] = {
              id,
              name: fileName,
              idDir: true,
              modDate,
              childrenIds: [],
              parentId,
            };

            fileMap[rootFolderId];
            traverseDirectory(id, filePath);
          }
        });
      }
    };
    traverseDirectory(imageFolderId, imageFolderPath);
    traverseDirectory(videoFolderId, videoFolderPath);

    return returnValue({ rootFolderId, fileMap });
  }
}
