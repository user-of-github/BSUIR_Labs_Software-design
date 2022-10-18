import { configureStore } from "@reduxjs/toolkit";
import GeneralAppStateReducer from './slices/general'


export const store = configureStore({
  reducer: {
    general: GeneralAppStateReducer
  },
});
