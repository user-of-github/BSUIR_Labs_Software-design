import { MMKV } from 'react-native-mmkv'
import { TIMERS_IDS_LIST_KEY } from '../state/storage'


export const removeAllTimers = (storage: MMKV): void => {
  const allIds: Array<string> = JSON.parse(storage.getString(TIMERS_IDS_LIST_KEY) || '[]')

  allIds.forEach((id: string): void => storage.delete(id))

  storage.set(TIMERS_IDS_LIST_KEY, JSON.stringify([]))
}
