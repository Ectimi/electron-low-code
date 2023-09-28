import { ICreateProjectParams } from 'root/types/ParamsType.ts';
import { ApiName } from 'root/types/ApiName.ts';
import { sendEvent } from '@/ipc/ipc.ts';

export function selectFloder() {
  return sendEvent<string>(ApiName.SelectFolder);
}

export function createProject(data: ICreateProjectParams) {
  return sendEvent<string>(ApiName.CreateProject, data);
}

export function getRecentlyProjects() {
  return sendEvent<string[]>(ApiName.RecentlyProject);
}
