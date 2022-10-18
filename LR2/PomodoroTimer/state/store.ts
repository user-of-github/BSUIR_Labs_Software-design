import { combineReducers, configureStore } from '@reduxjs/toolkit'
import GeneralAppStateReducer from './slices/general'


const combinedReducer = combineReducers({
  general: GeneralAppStateReducer
})

export const store = configureStore({
  reducer: combinedReducer
})


export type RootState = ReturnType<typeof combinedReducer>
