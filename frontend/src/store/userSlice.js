/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import store from './index.js';
// import { useSelector } from 'react-redux';

const initialState = {
  //
  // username: 'admin',
  // token: 'smkkskdcmksc5',
  // activeChannel: 'general',
  // messagesCount: 0,
  // isAuth: true,
  // activeChannelMessagesCount: 0,
  //
  // activeChannel: { name: 'general', id: '1', count: 0 },
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
    countMessages: (state, { payload: { count } }) => {
      state.activeChannelMessagesCount = count;
    },
  },
});

export const {
  addToken,
  countMessages,
  setActiveChannel,
  setDefaultChannelActive,
  setMessagesCount,
} = userSlice.actions;
export default userSlice.reducer;
