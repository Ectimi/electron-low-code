import { ViteDevServer } from 'vite';
import path from 'path';

const build = (entry: string) => {
  require('esbuild').buildSync({
    entryPoints: [path.join(__dirname, `../main/${entry}.ts`)],
    bundle: true,
    platform: 'node',
    outfile: path.join(__dirname, `../../dist/${entry}.js`),
    external: ['electron'],
  });
};

const buildMain = () => build('mainEntry');

const buildPreload = () => build('preload/index');

export const devPlugin = () => {
  return {
    name: 'dev-plugin',
    configureServer(server: ViteDevServer) {
      buildMain();
      buildPreload();

      if (server.httpServer) {
        server.httpServer.once('listening', () => {
          const { spawn } = require('child_process');
          const addressInfo = server.httpServer!.address();
          const httpAddress = addressInfo
            ? typeof addressInfo === 'string'
              ? addressInfo
              : `http://${addressInfo.address}:${addressInfo.port}`
            : '';
          const electronProcess = spawn(
            require('electron').toString(),
            ['./dist/mainEntry.js', httpAddress],
            {
              cwd: process.cwd(),
              stdio: 'inherit',
            }
          );
          electronProcess.on('close', () => {
            server.close();
            process.exit();
          });
        });
      }
    },
  };
};
