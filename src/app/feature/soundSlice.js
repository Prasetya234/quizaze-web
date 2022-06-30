/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const soundSlice = createSlice({
  name: 'sound',
  initialState: {
    isPlayed: false,
  },
  reducers: {
    playm: (state, action) => {
      state.isPlayed = action.payload.play;
    },

  },
});

export const { playm, stopm } = soundSlice.actions;

export default soundSlice.reducer;
