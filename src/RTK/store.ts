import { configureStore } from '@reduxjs/toolkit';
import sampleSliceActions, { sampleSlice } from './sampleSlice';

const store = configureStore({
  reducer: sampleSlice.reducer,
});

export default store;
