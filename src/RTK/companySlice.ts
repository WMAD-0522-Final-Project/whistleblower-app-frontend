import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from './store';

const initialState = {
  // TODO: temporary data
  companyData: {
    name: 'company name',
    logo: '/images/logo.jpg',
    themeColors: {
      primary: '#f96a02',
      secondary: '#fff',
      tertiary: '#ffcb14',
    },
  },
};

const companySlice = createSlice({
  name: 'companyData',
  initialState,
  reducers: {
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
  },
});

export const selectCompanyData = (state: StoreState) => state.company;

export const { setCompanyData } = companySlice.actions;

export default companySlice.reducer;
