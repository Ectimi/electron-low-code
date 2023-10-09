import {
  ipcRenderer,
  IpcRenderer,
  contextBridge,
  IpcRendererEvent,
} from 'electron';
import fs from 'fs';
import { isMac, isWindow } from 'main/utils';

type listener = <T = any>(event: IpcRendererEvent, args: T) => void;

export interface IElectronApi {
  isMac: boolean;
  isWindow: boolean;
  ipcRenderer: {
    once: (channel: string, handle: listener) => void;
    on: (channel: string, handle: listener) => void;
    send: <T>(channel: string, data?: T) => void;
    sendSync: <T>(channel: string, data?: T) => void;
  };
  fs: {
    access: (filePath: string) => Promise<boolean>;
  };
}

contextBridge.exposeInMainWorld('electronApi', {
  isMac,
  isWindow,
  fs: {
    access(filePath: string) {
      return new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            resolve(false);
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
    send<T>(channel: string, data: T) {
      ipcRenderer.send(channel, data);
    },
    sendSync<T>(channel: string, data: T) {
      ipcRenderer.sendSync(channel, data);
    },
  },
} as IElectronApi);
