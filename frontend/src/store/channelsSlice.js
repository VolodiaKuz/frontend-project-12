/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

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
      const channelsState = state;
      channelsState.channels = [...state.channels, channel];
    },
    removeChannel: (state, { payload: { channel } }) => {
      const channelsState = state;
      const newChannelsList = state.channels.filter((ch) => ch.id !== channel.id);
      channelsState.channels = [...newChannelsList];
    },
    renameChannel: (state, { payload: { channel } }) => {
      const channelsState = state;
      const otherChannels = state.channels.filter((ch) => ch.id !== channel.id);
      channelsState.channels = [...otherChannels, channel];
    },
    fillChannels: (state, { payload: { createdChannels } }) => {
      state.channels = [...createdChannels];
    },
    setActive: (state, { payload: { channel } }) => {
      state.activeChannel.name = channel.name;
      state.activeChannel.id = channel.id;
    },
    setDefaultChannelActive: (state) => {
      const defaultChannel = current(state).channels.filter((ch) => ch.id === '1')[0];
      state.activeChannel.name = defaultChannel.name;
      state.activeChannel.id = defaultChannel.id;
    },
    setMessagesCount: (state, { payload: { count } }) => {
      state.activeChannel.count = count;
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
