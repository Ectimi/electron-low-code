import { ipcMain } from 'electron';

interface response {
  code: number;
  data?: any;
}

export const listen = (eventName: any, handler: (data?: any) => any) => {
  ipcMain.on(eventName, async (e, request) => {
    const { id, data } = JSON.parse(request);
    const response: response = { code: 200 };
    try {
      response.data = await handler(data);
    } catch (err: any) {
      response.code = err.code || 500;
      response.data = { message: err.message || 'Main thread error.' };
    }
    e.sender.send(`${eventName}_res_${id}`, response);
  });
};
