import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    loadingSwitch: (state) => !state,
  },
});

export const { loadingSwitch } = loadingSlice.actions;

export default loadingSlice.reducer;
