import { BrowserWindow, dialog } from 'electron';
import { listen } from '../ipc';
import { ApiName } from 'root/types/ApiName';


function registerApi(mainWindow: BrowserWindow) {
  listen(ApiName.SelectFolder, async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const folderPath = result.filePaths[0];
      return folderPath;
    }

    return '';
  });
}

export default registerApi;
