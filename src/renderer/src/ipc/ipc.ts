import { genUid } from '@/utils';
const { ipcRenderer } = window.electronApi;

export function sendEvent(eventName: any, options: any = {}) {
  const { data } = options;

  const id = genUid();
  const responseEvent = `${eventName}_res_${id}`;

  return new Promise((resolve, reject) => {
    ipcRenderer.once(responseEvent, (_, response) => {
      if (response.code === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    });
    ipcRenderer.send(eventName, JSON.stringify({ id, data }));
  });
}
