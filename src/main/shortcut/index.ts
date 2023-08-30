import { app, globalShortcut, BrowserWindow } from 'electron';

function registerGlobalShortcut(win: BrowserWindow) {
  if (process.env.NODE_ENV === 'development') {
    globalShortcut.register('CommandOrControl+R', () => {
      console.log('reload');
      win.webContents.reload();
    });
  }

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
}

export default registerGlobalShortcut;
