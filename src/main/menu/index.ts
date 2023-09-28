import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { isMac } from 'main/utils';

export const enum EMenuAction {
  CreateProject = 'CreateProject',
}

export class MenuBuilder {
  mainWindow: BrowserWindow | null = null;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }
  
  build() {
    if (this.mainWindow !== null) {
      if (isMac) {
        const template: MenuItemConstructorOptions[] = [
          {
            label: '文件',
            submenu: [
              {
                label: '新建项目',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                  this.mainWindow!.webContents.send(EMenuAction.CreateProject);
                },
              },
            ],
          },
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
      } else {
        Menu.setApplicationMenu(null);
      }
    }
  }
}
