import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const modeSlice = createSlice({
  name: "mode",
  initialState: {
    advancedModeEnabled: false,
  },
  reducers: {
    setMode(state, action: PayloadAction<boolean>) {
      state.advancedModeEnabled = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;

