import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import companyReducer from './companySlice';
import userDataReducer from './userDataSlice';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    company: companyReducer,
    user: userDataReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
