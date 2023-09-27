import fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import { listen } from '../ipc';
import { ApiName } from 'root/types/ApiName';
import { returnValue, returnError } from './utils';

function registerApi(mainWindow: BrowserWindow) {
  listen(ApiName.SelectFolder, async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      return returnValue(folderPath);
    }

    return returnValue('');
  });

  listen<{ projectName: string; projectPath: string }>(
    ApiName.CreateProject,
    async (data) => {
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
  );
}

export default registerApi;
