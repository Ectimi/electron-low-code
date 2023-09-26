import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const userDataPath = app.getPath('userData');
const appFolderPath = path.join(userDataPath, 'lowCode');
// 创建最近打开路径数据文件的路径
const recentProjectsFilePath = path.join(appFolderPath, 'recentProjects.json');

// 创建应用文件夹（如果不存在）
function createAppFolder() {
  if (!fs.existsSync(appFolderPath)) {
    fs.mkdirSync(appFolderPath);
  }
}

// 从文件中读取最近打开的项目路径列表
function loadRecentProjects(): string[] {
  try {
    const data = fs.readFileSync(recentProjectsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 文件不存在或读取失败，返回空数组
    return [];
  }
}

// 将最近打开的项目路径列表保存到文件中
function saveRecentProjects(recentProjects: string[]) {
  fs.writeFileSync(
    recentProjectsFilePath,
    JSON.stringify(recentProjects),
    'utf-8'
  );
}

export function initApplicationData() {
  createAppFolder();
  loadRecentProjects();
}
