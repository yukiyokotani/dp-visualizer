import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return { isDarkTheme: !state.isDarkTheme };
    },
  },
});

export default themeSlice;
