import { ApiName } from '../../../types/ApiName.ts';
import { sendEvent } from './ipc.ts';

export function selectFloder() {
  return sendEvent<string>(ApiName.SelectFolder);
}

export function createProject(data: object) {
  return sendEvent<string>(ApiName.CreateProject, data);
}
