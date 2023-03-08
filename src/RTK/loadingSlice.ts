import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// export const selectLoading = (state: { loading: boolean }) => state.loading;

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
