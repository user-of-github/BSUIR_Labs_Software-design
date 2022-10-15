import { MMKV } from 'react-native-mmkv'
import { TIMERS_IDS_LIST_KEY } from '../state/storage'


export const removeTimer = (storage: MMKV, id: string): void => {
  storage.delete(id)

  const allIds: Array<string> = JSON.parse(storage.getString(TIMERS_IDS_LIST_KEY) || '[]')

  const withRemovedId: Array<string> = allIds.filter((item: string): boolean => item !== id)

  storage.set(TIMERS_IDS_LIST_KEY, JSON.stringify(withRemovedId))
}
