import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from './store';

const initialState = { isLoading: false };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectLoading = (state: StoreState) => state.loading;

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
