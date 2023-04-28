import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from './store';

const initialState = {
  // TODO: temporary data
  companyData: {
    name: 'company name',
    logoImg: '/images/logo.jpg',
    themeColors: {
      primary: '#f96a02',
      secondary: '#ffcb14',
      tertiary: '#ffffff',
    },
    departments: [
      {
        _id: '642deea549cc00dadcf2af63',
        name: 'department2',
      },
      {
        _id: '642df1a7dfcc84e1ea98c865',
        name: 'department1',
        __v: 0,
      },
    ],
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
