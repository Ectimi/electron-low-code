import path from 'path';
import { getDistPath } from '../utils';
import { BrowserWindow } from 'electron';
import type { BrowserWindowConstructorOptions } from 'electron';

export class WindowCreator {
  private defaultOptions: BrowserWindowConstructorOptions = {
    title: 'main',
    minHeight: 800,
    minWidth: 1400,
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

  createWindow(options?: BrowserWindowConstructorOptions) {
    return new BrowserWindow(Object.assign({}, this.defaultOptions, options));
  }
}
