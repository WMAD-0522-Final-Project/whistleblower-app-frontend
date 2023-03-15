import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from './store';

const initialState = {
  firstName: 'John',
  lastName: 'Doe',
  profileImg: '/images/profileImg.jpg',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state = action.payload;
    },
  },
});

export const selectUserData = (state: StoreState) => state.userData;

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
