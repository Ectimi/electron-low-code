import {
  ipcRenderer,
  contextBridge,
  IpcRendererEvent,
} from "electron";
import fs from "fs";
import { isMac, isWindow } from "main/utils";

interface IResponse {
  code: number;
  data?: any;
}

type listener =(event: IpcRendererEvent, args: IResponse) => void;

export interface IElectronApi {
  isMac: boolean;
  isWindow: boolean;
  ipcRenderer: {
    once: (channel: string, handle: listener) => void;
    on: (channel: string, handle: listener) => void;
    send: <T>(channel: string, data?: T) => void;
    sendSync: <T>(channel: string, data?: T) => void;
    removeAllListeners: (channel: string) => void;
  };
  fs: {
    access: (filePath: string) => Promise<boolean>;
  };
}

contextBridge.exposeInMainWorld("electronApi", {
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
    removeAllListeners(channel: string) {
      ipcRenderer.removeAllListeners(channel);
    },
  },
} as IElectronApi);
