import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import companyReducer from './companySlice';

const store = configureStore({
  reducer: { loading: loadingReducer, company: companyReducer },
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
