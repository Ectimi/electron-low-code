declare module '*.png';
declare module '*.jpg';
import { IElectronApi } from './src/main/preload';

declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare global {
  interface Window {
    readonly electronApi: IElectronApi;
  }
}
