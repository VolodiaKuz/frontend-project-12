import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    { channelName: 'general', messageId: 1, text: '1st message', userName: 'admin' },
    { channelName: 'general', messageId: 2, text: '2nd message', userName: 'admin' },
    { channelName: 'general', messageId: 3, text: 'one more message', userName: 'admin' },
    { channelName: 'general', messageId: 4, text: 'some message', userName: 'admin' }
  ],
};

const tasksSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages = [...state.messages, message];
    },
  },
});

export const { addMessage } = tasksSlice.actions;

export default tasksSlice.reducer;
