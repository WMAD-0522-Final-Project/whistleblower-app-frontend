import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    firstName: 'John',
    lastName: 'Doe',
    profileImg: '/images/profileImg.jpg',
  },
];

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    create: (state, action) => {},
    update: (state, action) => {},
    remove: (state, action) => {},
  },
});

export const { create, update, remove } = userDataSlice.actions;

export default userDataSlice.reducer;
