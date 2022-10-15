import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { Theme } from "../../types/Theme";


const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: Appearance.getColorScheme() === "dark" ? Theme.DARK : Theme.LIGHT,
  },
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});


export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
