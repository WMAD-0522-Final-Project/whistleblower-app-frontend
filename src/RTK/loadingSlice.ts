import { createSlice } from '@reduxjs/toolkit';

const initialState = { status: false };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const selectLoading = (state: { loading: boolean }) => state.loading;

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
