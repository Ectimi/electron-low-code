import {
  ipcRenderer,
  IpcRenderer,
  contextBridge,
  IpcRendererEvent,
} from 'electron';
import fs from 'fs';
import { isMac, isWindow } from 'main/utils';

type listener = (event: IpcRendererEvent, ...args: any[]) => void;

export interface IElectronApi {
  isMac: boolean;
  isWindow: boolean;
  ipcRenderer: IpcRenderer;
  fs: {
    access: (filePath: string) => Promise<boolean>;
  };
}

contextBridge.exposeInMainWorld('electronApi', {
  isMac,
  isWindow,
  fs: {
    access(filePath: string) {
      return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        });
      });
    },
  },
  ipcRenderer: {
    once(channel: string, handle: listener) {
      ipcRenderer.once(channel, handle);
    },
    on(channel: string, handle: listener) {
      ipcRenderer.on(channel, handle);
    },
    send(channel: string, handle: listener) {
      ipcRenderer.send(channel, handle);
    },
    sendSync(channel: string, handle: listener) {
      ipcRenderer.sendSync(channel, handle);
    },
  },
} as IElectronApi);
