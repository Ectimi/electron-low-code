import { ApiName } from '../../../types/ApiName.ts'
import { sendEvent } from './ipc.ts';

export function selectFloder() {
  return sendEvent<string>(ApiName.SelectFolder);
}
