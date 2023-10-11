import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { isMac } from "main/utils";
import { EMenuAction } from "root/types/MenuAction";

export class MenuBuilder {
  build() {
    if (isMac) {
      const template: MenuItemConstructorOptions[] = [
        { label: "lowcode" },
        {
          label: "文件",
          submenu: [
            {
              label: "新建项目",
              accelerator: "CmdOrCtrl+N",
              click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                  focusedWindow.webContents.send(EMenuAction.CreateProject);
                }
              },
            },
            {
              label: "新建窗口",
              accelerator: "CmdOrCtrl+Shift+N",
              click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                  focusedWindow.webContents.send(EMenuAction.NewWindow);
                }
              },
            },
            {
              label: "打开项目",
              accelerator: "CmdOrCtrl+O",
              click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                  focusedWindow.webContents.send(EMenuAction.OpenProject);
                }
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
