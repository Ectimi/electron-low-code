import { BrowserWindow } from 'electron';
import path from 'path';

export const getWin = (title: string) =>
  BrowserWindow.getAllWindows().filter((wins) => wins.title === title)[0];

export const getDistPath = () => {
  return path.join(process.cwd(), 'dist');
};
