import path from 'path';
import fs from 'fs';
import { isMac } from '../utils';

const packageObj = require('../../../package.json');

export default class ApplicationData {
  static aplicationFolderPath = '';
  static configFilePath = '';

  static init() {
    this.createApplicationFolder();
    this.createConfigFile()
  }

  static createApplicationFolder() {
    if (isMac) {
      // macOS 上使用 ~/Library/Application Support/ 目录
      this.aplicationFolderPath = path.join(
        process.env.HOME!,
        'Library',
        'Application Support',
        packageObj.name
      );
    } else {
      // Windows 上使用 %APPDATA% 环境变量确定用户数据目录
      this.aplicationFolderPath = path.join(
        process.env.APPDATA!,
        packageObj.name
      );
    }

    if (!fs.existsSync(this.aplicationFolderPath)) {
      fs.mkdirSync(this.aplicationFolderPath);
    }
  }

  static createConfigFile() {
    this.configFilePath = path.join(this.aplicationFolderPath, 'config.json');
    if (!fs.existsSync(this.configFilePath)) {
      const defaultConfig = { theme: 'light' };
      this.writeConfigFile(defaultConfig);
    }
  }

  static writeConfigFile(data: object) {
    try {
      const configData = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.configFilePath, configData, 'utf-8');
      console.log('Config file saved successfully');
    } catch (error) {
      // 处理写入配置文件失败的情况
      console.error('Failed to write config file:', error);
    }
  }

  static readConfigFile() {
    try {
      const configData = fs.readFileSync(this.configFilePath, 'utf-8');
      const config = JSON.parse(configData);
      return config;
    } catch (error) {
      // 处理读取配置文件失败的情况
      console.error('Failed to read config file:', error);
      return null;
    }
  }
}
