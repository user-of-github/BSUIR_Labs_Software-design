import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralAppState } from '../../types/GeneralAppState'
import { getGeneralAppStateFromStorage } from '../../utils/getGeneralAppStateFromStorage'
import { storage } from '../storage'
import { Theme } from '../../types/Theme'


const generalSlice = createSlice<GeneralAppState, any, any>({
  name: 'general',
  initialState: getGeneralAppStateFromStorage(storage),
  reducers: {
    setCurrentlyEditedTimer(state: GeneralAppState, action: PayloadAction<string>): void {
      state.currentlyEditedTimer = action.payload
    },
    resetCurrentlyEditedTimer(state: GeneralAppState, action: PayloadAction): void {
      state.currentlyEditedTimer = undefined
    },
    setTheme(state: GeneralAppState, action: PayloadAction<Theme>): void {
      state.theme = action.payload
    },
    setMode(state: GeneralAppState, action: PayloadAction<boolean>): void {
      state.advancedModeOn = action.payload
    }
  }
})

export const { setCurrentlyEditedTimer } = generalSlice.actions
export const { resetCurrentlyEditedTimer } = generalSlice.actions
export const { setTheme } = generalSlice.actions
export const { setMode } = generalSlice.actions
export default generalSlice.reducer
