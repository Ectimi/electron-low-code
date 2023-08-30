import path from 'path';
import chokidar from 'chokidar';
import { spawn } from 'child_process';
import { PluginOption } from 'vite';
import { getDistPath } from '../main/utils';

export const electronReloadPlugin = () => {
  return {
    name: 'electron-reload',
    apply: 'serve',
    configureServer(server) {
      if (server.httpServer) {
        server.httpServer.on('listening', () => {
          chokidar
            .watch(path.resolve(getDistPath(), '../src/main'))
            .on('change', () => {
              server.ws.send({ type: 'full-reload' });
              spawn('npm', ['run', 'dev'], {
                shell: true,
                env: process.env,
                stdio: 'inherit',
              });
            });
        });
      }
    },
  } as PluginOption;
};
