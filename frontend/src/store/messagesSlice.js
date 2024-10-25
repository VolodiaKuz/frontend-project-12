/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';
// import store from './index.js';
// import { setMessagesCount } from './channelsSlice.js';

const initialState = {
  messages: [
    // { id: '1', body: 'text message', channelId: 1, username: 'admin' },
    // { id: '2', body: 'text 2', channelId: 1, username: 'admin' },
    // { id: '3', body: 'text 3', channelId: 1, username: 'admin' },
    // { id: '4', body: 'text 4', channelId: 1, username: 'admin' },
  ],
  activeChannelMessagesCount: 0,
};

const tasksSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      // state.messages = [...state.messages, message];
      const messagesState = state;
      messagesState.messages = [...state.messages, message];
      const test = current(state).messages.filter((el) => el.channelId === message.channelId);
      state.activeChannelMessagesCount = test.length;
    },
    fillMessages: (state, { payload: { createdMessages } }) => {
      state.messages = [...createdMessages];
      const test = current(state).messages.filter((el) => el.channelId === '1');
      state.activeChannelMessagesCount = test.length;
    },
    countMessages: (state, { payload: { count } }) => {
      console.log('count in messageSlice =>', count);
      state.activeChannelMessagesCount = count;
    },
  },
});

export const { addMessage, fillMessages, countMessages } = tasksSlice.actions;

export default tasksSlice.reducer;
