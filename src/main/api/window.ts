import { BrowserWindow } from 'electron';
import { ApiName } from 'root/types/ApiName';
import { returnValue } from './utils';

export default class WindowApi {
  async [ApiName.GetWindowNumbers]() {
    return returnValue(BrowserWindow.getAllWindows().length);
  }
}
