import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from './store';

const initialState = {
  userData: {
    _id: '',
    companyId: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    profileImg: '',
    permissions: [],
  },
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const selectUserData = (state: StoreState) => state.user;

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
