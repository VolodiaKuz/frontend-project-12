import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [
    { channelId: 1, text: 'testing work of store', channelName: 'general', active: true },
    { channelId: 2, text: 'testing work of store', channelName: 'random', active: false }
  ],
};

const tasksSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels = [...state.channels, channel];
    },
  },
});

export const { addChannel } = tasksSlice.actions;

export default tasksSlice.reducer;
