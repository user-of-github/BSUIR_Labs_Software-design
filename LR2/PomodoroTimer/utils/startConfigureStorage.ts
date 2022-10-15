import { storage, TIMERS_IDS_LIST_KEY, TIMERS_LIST_KEY } from '../state/storage'
import { MMKV } from 'react-native-mmkv'


export const startConfigureStorage = (storage: MMKV): void => {
  if (storage.getString(TIMERS_IDS_LIST_KEY) === undefined) {
    storage.set(TIMERS_LIST_KEY, JSON.stringify([]))
  }
}
