import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lightTheme, darkTheme } from "../../common/Theme";

export const loadUserTheme = createAsyncThunk("app/theme", async () => {
  const loadingTheme = false;
  return loadingTheme;
});

const initialState = {
  loadingTheme: false,
  isDarkMode: false,
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state, action) => {
      console.log("toggleTheme ACTION===>", action);
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? { ...darkTheme } : { ...lightTheme };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserTheme.pending, (state) => {
        state.loadingTheme = true;
      })
      .addCase(loadUserTheme.fulfilled, (state, action) => {
        console.log("loadUserTheme Action====>", action.payload);
        state.loadingTheme = false;
      });
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
