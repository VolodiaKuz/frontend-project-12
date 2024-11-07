/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [
  ],
  activeChannel: { name: 'general', id: '1', count: 0 },
};

const tasksSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels = [...state.channels, channel];
    },
    removeChannel: (state, { payload: { channel } }) => {
      const newChannelsList = state.channels.filter((ch) => ch.id !== channel.id);
      state.channels = [...newChannelsList];
    },
    renameChannel: (state, { payload: { channel } }) => {
      const otherChannels = state.channels.filter((ch) => ch.id !== channel.id);
      state.channels = [...otherChannels, channel];
    },
    fillChannels: (state, { payload: { createdChannels } }) => {
      state.channels = [...createdChannels];
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  fillChannels,
  setActive,
  setDefaultChannelActive,
  setMessagesCount,
} = tasksSlice.actions;

export default tasksSlice.reducer;
