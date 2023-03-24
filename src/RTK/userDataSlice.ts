import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from './store';

const initialState = {
  userData: {
    firstName: 'John',
    lastName: 'Doe',
    profileImg: '/images/profileImg.jpg',
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
