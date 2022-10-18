import { GeneralAppState } from '../types/GeneralAppState'
import { GENERAL_STATE_KEY } from '../state/storage'
import { MMKV } from 'react-native-mmkv'


export const updateGeneralAppStateInStorage = (storage: MMKV, state: GeneralAppState): void => {
  storage.set(GENERAL_STATE_KEY, JSON.stringify(state))
}

