import { configureStore } from '@reduxjs/toolkit';
import { sampleSlice } from './sampleSlice';

const store = configureStore({
  reducer: sampleSlice.reducer,
});

export default store;
