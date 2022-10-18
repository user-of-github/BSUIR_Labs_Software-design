import { MMKV } from 'react-native-mmkv'
import { Timer } from '../types/Timer'


export const getTimerById = (storage: MMKV, id: string): Timer => {
  if (id === undefined) throw new Error("getTimerById(): Can't get timer by id. Id is undefined")
  const tryResponse: string | undefined = storage.getString(id)
  if (tryResponse === undefined) throw new Error("getTimerById(): Can't get timer by id. Timer with such id not exists")
  return JSON.parse(tryResponse)
}
