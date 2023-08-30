import path from 'path';
import fs from 'fs-extra';

class BuildObj {
  buildMain() {
    require('esbuild').buildSync({
      entryPoints: [path.join(__dirname, `../main/mainEntry.ts`)],
      bundle: true,
      platform: 'node',
      minify: true,
      outfile: path.join(__dirname, `../../dist/mainEntry.js`),
      external: ['electron'],
    });
  }
  preparePackageJson() {
    const pkgJsonPath = path.join(process.cwd(), 'package.json');
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    //https://github.com/electron-userland/electron-builder/issues/4157#issuecomment-596419610
    const electronConfig = localPkgJson.devDependencies.electron.replace(
      '^',
      ''
    );
    localPkgJson.main = 'mainEntry.js';
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    localPkgJson.devDependencies = { electron: electronConfig };
    const tarJsonPath = path.join(process.cwd(), 'dist', 'package.json');

    fs.outputFileSync(tarJsonPath, JSON.stringify(localPkgJson));
    fs.ensureDirSync(path.join(process.cwd(), 'dist/node_modules'));
  }
  buildInstaller() {
    const options = {
      config: {
        directories: {
          output: path.join(process.cwd(), 'release'),
          app: path.join(process.cwd(), 'dist'),
        },
        files: ['**'],
        extends: null,
        productName: 'LowCode',
        appId: 'com.low-code.desktop',
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'LowCode',
        },
        publish: [{ provider: 'generic', url: 'http://localhost:5500/' }],
      },
      project: process.cwd(),
    };
    return require('electron-builder').build(options);
  }
}

export const buildPlugin = () => {
  return {
    name: 'build-plugin',
    closeBundle: () => {
      const buildObj = new BuildObj();
      buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.buildInstaller();
    },
  };
};
