import {
  ipcRenderer,
  IpcRenderer,
  contextBridge,
  IpcRendererEvent,
} from 'electron';

type listener = (event: IpcRendererEvent, ...args: any[]) => void;

export interface IElectronApi {
  ipcRenderer: IpcRenderer;
}

contextBridge.exposeInMainWorld('electronApi', {
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
