import { ipcMain } from 'electron';

interface response {
  code: number;
  data?: any;
}

export type TListen = <Data>(
  eventName: string,
  handler: (data?: Data) => any
) => void;

export const listen: TListen = <Data>(
  eventName: string,
  handler: (data?: Data) => any
) => {
  ipcMain.on(eventName, async (e, request) => {
    const { id, data } = JSON.parse(request);
    const response: response = { code: 200 };
    try {
      const { code, value, error } = await handler(data);
      if (code === 200) {
        response.data = value;
      } else {
        response.code = code;
        response.data = error;
      }
    } catch (err: any) {
      response.code = err.code || 500;
      response.data = { message: err.message || 'Main thread error.' };
    }
    e.sender.send(`${eventName}_res_${id}`, response);
  });
};
