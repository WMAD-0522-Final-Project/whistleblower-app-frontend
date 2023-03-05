import { createSlice } from '@reduxjs/toolkit';

export const sampleSlice = createSlice({
  name: 'sampleSlice',
  initialState: null,
  reducers: {
    fnName(state, action) {},
  },
});

const sampleSliceActions = sampleSlice.actions;

export default sampleSliceActions;
