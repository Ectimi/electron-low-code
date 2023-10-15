import { BrowserWindow } from 'electron';
import path from 'path';

export const getWin = (title: string) =>
  BrowserWindow.getAllWindows().filter((wins) => wins.title === title)[0];

export const getDistPath = () => {
  return path.join(process.cwd(), 'dist');
};

export const isMac = process.platform === 'darwin'

export const isWindow = process.platform === 'win32'

export const sendRendererEvent = (channel:string)=>{
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.send(channel);
  }
}