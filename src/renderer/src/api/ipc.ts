import {nanoid} from "nanoid";
const { ipcRenderer } = window.electronApi

export function sendEvent<T> (eventName:string, options:any = {}):Promise<T> {
    const { data } = options

    const id = nanoid()
    const responseEvent = `${eventName}_res_${id}`

    return new Promise((resolve, reject) => {
        ipcRenderer.once(responseEvent, (_, response) => {
            if (response.code === 200) {
                resolve(response.data)
            } else {
                reject(response.data)
            }
        })
        ipcRenderer.send(eventName, JSON.stringify({ id, data }))
    })
}