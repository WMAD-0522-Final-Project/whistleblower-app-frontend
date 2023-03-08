import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    loadingSwitch: (state) => !state,
  },
});

export const selectLoading = (state: { loading: boolean }) => state.loading;

export const { loadingSwitch } = loadingSlice.actions;

export default loadingSlice.reducer;
