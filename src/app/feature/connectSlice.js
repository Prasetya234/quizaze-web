/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const connectSlice = createSlice({
  name: 'connect',
  initialState: {
    profile: {
      avatar: '',
      email: '',
      guest: false,
      username: '',
      school: null,
    },
    isLoading: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action;
    },
  },
});

export const { setProfile, setLoading } = connectSlice.actions;
export default connectSlice.reducer;
