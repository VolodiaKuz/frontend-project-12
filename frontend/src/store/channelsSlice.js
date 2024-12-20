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
    setActiveChannel: (state, { payload: { channel } }) => {
      state.activeChannel.name = channel.name;
      state.activeChannel.id = channel.id;
    },
    setDefaultChannelActive: (state, { payload: { channels } }) => {
      const defaultChannel = channels.find((ch) => ch.id === '1')[0];
      state.activeChannel.name = defaultChannel.name;
      state.activeChannel.id = defaultChannel.id;
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  fillChannels,
  setActiveChannel,
  setDefaultChannelActive,
} = tasksSlice.actions;

export default tasksSlice.reducer;
