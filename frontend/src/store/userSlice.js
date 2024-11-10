/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';
// import store from './index.js';
// import { useSelector } from 'react-redux';

const initialState = {
  // username: 'admin',
  // token: 'smkkskdcmksc5',
  // activeChannel: 'general',
  // activeChannel: { name: 'general', id: '1', count: 0 },
  isAuth: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || null,
  token: localStorage.getItem('token') || null,
  activeChannel: { name: 'general', id: '1', count: 0 },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, { payload: { user } }) => {
      state.token = user.token;
      state.username = user.username;
    },
    setActiveChannel: (state, { payload: { channel } }) => {
      state.activeChannel.name = channel.name;
      state.activeChannel.id = channel.id;
    },
    setDefaultChannelActive: (state, { payload: { channels } }) => {
      const defaultChannel = channels.filter((ch) => ch.id === '1')[0];
      state.activeChannel.name = defaultChannel.name;
      state.activeChannel.id = defaultChannel.id;
    },
    logIn: (state, { payload: { user } }) => {
      state.username = user.username;
      state.token = user.token;
      state.isAuth = true;
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
      console.log('state', current(state));
    },
    logOut: (state) => {
      state.isAuth = false;
      state.username = null;
      state.token = null;
      localStorage.clear();
      console.log('state after logout', current(state));
    },
  },
});

export const {
  addToken,
  countMessages,
  setActiveChannel,
  setDefaultChannelActive,
  setMessagesCount,
  logIn,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
