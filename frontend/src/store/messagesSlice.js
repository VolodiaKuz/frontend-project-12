/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  activeChannelMessagesCount: 0,
};

const tasksSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
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
      state.activeChannelMessagesCount = count;
    },
  },
});

export const { addMessage, fillMessages, countMessages } = tasksSlice.actions;

export default tasksSlice.reducer;
