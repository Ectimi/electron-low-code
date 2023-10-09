import { ICreateProjectParams } from 'root/types/ParamsType.ts';
import { ApiName } from 'root/types/ApiName.ts';
import {
  IApplicationConfig,
  IProjectItem,
} from 'root/main/template/applicationConfigTemplate';
import { sendEvent } from '@/ipc/ipc.ts';

export function selectFloder() {
  return sendEvent<string>(ApiName.SelectFolder);
}

export function createProject(data: ICreateProjectParams) {
  return sendEvent<string>(ApiName.CreateProject, data);
}

export function getRecentlyProjects() {
  return sendEvent<IApplicationConfig['recentlyProjects']>(
    ApiName.RecentlyProject
  );
}

export function getWindowNumbers() {
  return sendEvent<number>(ApiName.GetWindowNumbers);
}

export function getIsValidProject(path: string) {
  return sendEvent<{
    isValid: boolean;
    projectName?: string;
    projectPath?: string;
  }>(ApiName.IsValidProject, path);
}

export function getApplicationConfig(key?: keyof IApplicationConfig) {
  return sendEvent(ApiName.GetApplicationConfig, key);
}

export function checkProjectWindowOpen(project: IProjectItem) {
  return sendEvent(ApiName.CheckProjectWindowOpen, project);
}
