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
      state.channels = [...state.channels, channel];
    },
    removeChannel: (state, { payload: { channel } }) => {
      const newChannelsList = state.channels.filter((ch) => ch.id !== channel.id)
      state.channels = [...newChannelsList];
    },
  },
});

export const { addChannel, removeChannel } = tasksSlice.actions;

export default tasksSlice.reducer;
