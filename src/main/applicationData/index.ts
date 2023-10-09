import path from 'path';
import fs from 'fs';
import { isMac } from '../utils';
import applicationConfigTemplate, {
  IApplicationConfig,
} from '../template/applicationConfigTemplate';

const packageObj = require('../../../package.json');

export class ApplicationDataManager {
  get aplicationFolderPath() {
    return isMac
      ? path.join(
          process.env.HOME!,
          'Library',
          'Application Support',
          packageObj.name
        )
      : path.join(process.env.APPDATA!, packageObj.name);
  }

  get applicationConfigFilePath() {
    return path.join(this.aplicationFolderPath, 'application.config.json');
  }

  init() {
    this.createApplicationFolder();
    this.createConfigFile();
  }

  createApplicationFolder() {
    if (!fs.existsSync(this.aplicationFolderPath)) {
      fs.mkdirSync(this.aplicationFolderPath);
    }
  }

  createConfigFile() {
    const configFilePath = this.applicationConfigFilePath;
    if (!fs.existsSync(configFilePath)) {
      const defaultConfig: IApplicationConfig = Object.assign(
        {},
        applicationConfigTemplate
      );
      this.writeConfigFile(defaultConfig);
    }
  }

  writeConfigFile(data: object) {
    try {
      const configData = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.applicationConfigFilePath, configData, 'utf-8');
      console.log('Config file saved successfully');
    } catch (error) {
      // 处理写入配置文件失败的情况
      console.error('Failed to write config file:', error);
    }
  }

  readConfigFile(): IApplicationConfig | null {
    try {
      const configData = fs.readFileSync(
        this.applicationConfigFilePath,
        'utf-8'
      );
      const config = JSON.parse(configData);
      return config;
    } catch (error) {
      // 处理读取配置文件失败的情况
      console.error('Failed to read config file:', error);
      return null;
    }
  }
}
