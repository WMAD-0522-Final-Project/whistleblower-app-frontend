import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sliceName',
  initialState: null,
  reducers: {
    fnName(state, action) {},
  },
});

const store = configureStore({
  reducer: slice.reducer,
});

export const sliceActions = slice.actions;

export default store;
