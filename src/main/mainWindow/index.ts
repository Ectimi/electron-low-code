import path from 'path';
import { getDistPath } from '../utils';
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

let mainWindow: BrowserWindow | null = null;

export function createMainWindow(
  options: BrowserWindowConstructorOptions = {}
) {
  if (mainWindow !== null) {
    return mainWindow;
  }
  const defaultOptions: BrowserWindowConstructorOptions = {
    title: 'main',
    minHeight: 800,
    minWidth: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: true,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
      preload: path.resolve(getDistPath(), 'preload/index.js'),
    },
  };

  mainWindow = new BrowserWindow(Object.assign({}, defaultOptions, options));
  return mainWindow;
}
