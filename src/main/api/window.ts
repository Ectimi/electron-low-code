import { BrowserWindow } from 'electron';
import { ApiName } from 'root/types/ApiName';
import { returnValue } from './utils';
import { IProjectItem } from '../template/applicationConfigTemplate';
import url from 'url';

export default class WindowApi {
  async [ApiName.GetWindowNumbers]() {
    return returnValue(BrowserWindow.getAllWindows().length);
  }

  async [ApiName.CheckProjectWindowOpen](project: IProjectItem) {
    const allWindows = BrowserWindow.getAllWindows();

    for (let i = 0; i < allWindows.length; i++) {
      const win = allWindows[i];
      const pageUrl = win.webContents.getURL();
      const parsedUrl = new url.URL(pageUrl);
      const searchParams = new url.URLSearchParams(
        parsedUrl.hash.split('?')[1]
      );
      const projectName = searchParams.get('projectName');
      const projectPath = searchParams.get('projectPath');

      if (
        project.projectName === projectName &&
        project.projectPath === projectPath
      ) {
        win.focus();
        return returnValue(true);
      }
    }
    return returnValue(false);
  }
}
