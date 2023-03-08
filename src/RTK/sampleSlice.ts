import { createSlice } from '@reduxjs/toolkit';

const sampleSlice = createSlice({
  name: 'sampleSlice',
  initialState: null,
  reducers: {
    fnName(state, action) {},
  },
});

export const sampleSliceActions = sampleSlice.actions;

export default sampleSlice.reducer;
