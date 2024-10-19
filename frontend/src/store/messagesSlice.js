import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    { id: '1', body: 'text message', channelId: 1, username: 'admin' },
    { id: '2', body: 'text 2', channelId: 1, username: 'admin' },
    { id: '3', body: 'text 3', channelId: 1, username: 'admin' },
    { id: '4', body: 'text 4', channelId: 1, username: 'admin' },
  ],
};

const tasksSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages = [...state.messages, message];
      console.log('state.messages in messageSlice ==>', state.messages);
    },
  },
});

export const { addMessage } = tasksSlice.actions;

export default tasksSlice.reducer;
