import { app, globalShortcut, BrowserWindow } from 'electron';

export class ShortcutRegister {
  win: BrowserWindow | null = null;

  constructor(win: BrowserWindow) {
    this.win = win;
  }

  init() {
    this.openTools();
    this.reload();

    // 当所有窗口都关闭时，取消所有的快捷键注册
    app.on('will-quit', () => {
      globalShortcut.unregisterAll();
    });
  }

  register(key: string, cb: (...args: any) => void) {
    globalShortcut.register(key, cb);
  }

  reload() {
    if (this.win === null) return;
    if (process.env.NODE_ENV === 'development') {
      this.register('CommandOrControl+R', () => {
        console.log('reload');
        this.win!.webContents.reload();
      });
    }
  }

  openTools() {
    if (this.win === null) return;
    if (process.env.NODE_ENV === 'development') {
      this.register('CommandOrControl+Alt+C', () => {
        this.win!.webContents.toggleDevTools();
      });
    }
  }
}
