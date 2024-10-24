/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    // { id: '1', body: 'text message', channelId: 1, username: 'admin' },
    // { id: '2', body: 'text 2', channelId: 1, username: 'admin' },
    // { id: '3', body: 'text 3', channelId: 1, username: 'admin' },
    // { id: '4', body: 'text 4', channelId: 1, username: 'admin' },
  ],
};

const tasksSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      // state.messages = [...state.messages, message];
      const messagesState = state;
      messagesState.messages = [...state.messages, message];
    },
    fillMessages: (state, { payload: { createdMessages } }) => {
      // const channelsState = state;
      // channelsState.channels = [...channels];
      console.log('log in messages slice =====>', createdMessages);
      state.messages = [...createdMessages];
    },
  },
});

export const { addMessage, fillMessages } = tasksSlice.actions;

export default tasksSlice.reducer;
