import { MMKV } from 'react-native-mmkv'
import { GeneralAppState } from '../types/GeneralAppState'
import { GENERAL_STATE_KEY } from '../state/storage'
import { Appearance } from 'react-native'
import { Theme } from '../types/Theme'


export const getGeneralAppStateFromStorage = (storage: MMKV): GeneralAppState => {
  const tryGet: string | undefined = storage.getString(GENERAL_STATE_KEY)

  if (typeof tryGet === 'string') return JSON.parse(tryGet)

  return {
    currentlyEditedTimer: undefined,
    theme: Appearance.getColorScheme() === "dark" ? Theme.DARK : Theme.LIGHT,
    advancedModeOn: false
  }
}
