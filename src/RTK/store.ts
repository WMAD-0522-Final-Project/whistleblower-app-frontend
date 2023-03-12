import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import userDataReducer from './userDataSlice';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    userData: userDataReducer,
  },
});

export default store;
