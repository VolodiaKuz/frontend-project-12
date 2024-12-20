/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || null,
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, { payload: { user } }) => {
      state.username = user.username;
      state.token = user.token;
      state.isAuth = true;
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
    },
    logOut: (state) => {
      state.isAuth = false;
      state.username = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const {
  logIn,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
