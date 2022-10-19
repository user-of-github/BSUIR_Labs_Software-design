import { MMKV } from 'react-native-mmkv'
import { GENERAL_STATE_KEY } from '../state/storage'


export const resetGeneralAppStateInStorage = (storage: MMKV): void => {
  storage.delete(GENERAL_STATE_KEY)
}
