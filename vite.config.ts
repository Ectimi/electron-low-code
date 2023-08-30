import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devPlugin } from './src/plugins/devPlugin';
import { buildPlugin } from './src/plugins/buildPlugin';
import { electronReloadPlugin } from './src/plugins/electronReloadPlugin';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src/renderer'),
  build: {
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      plugins: [buildPlugin()],
    },
  },
  plugins: [electronReloadPlugin(), devPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer/src'),
      main: path.resolve(__dirname, 'src/main'),
    },
  },
});
