import { configureStore } from "@reduxjs/toolkit";
import ModeReducer from "./slices/mode";
import ThemeReducer from "./slices/theme";


export const store = configureStore({
  reducer: {
    mode: ModeReducer,
    theme: ThemeReducer,
  },
});
