import {sendEvent} from './ipc.ts'

export function getAllDisplays(){
  return sendEvent('getAllDisplays')
}