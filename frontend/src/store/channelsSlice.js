import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
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
  },
});

export const { addChannel, removeChannel, renameChannel } = tasksSlice.actions;

export default tasksSlice.reducer;
