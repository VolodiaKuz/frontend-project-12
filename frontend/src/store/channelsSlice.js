/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const uploadChannels = async () => {
//   console.log(localStorage.getItem('userId'));
//   if (!localStorage.getItem('userId')) return [];
//   const { token } = JSON.parse(localStorage.getItem('userId'));

//   const result = await axios.get('/api/v1/channels', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return result.data;
// };

// const test = await uploadChannels();
// console.log('test ===============>', test);

const initialState = {
  channels: [
    // { id: 1, name: 'general', removable: false },
    // { id: 2, name: 'random', removable: false },
    // ...test,
    //
  ],
  // activeChannel: 1,
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
      // const channelsState = state;
      // channelsState.channels = [...channels];
      console.log('log in channels slice =====>', createdChannels);
      state.channels = [...createdChannels];
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  fillChannels,
} = tasksSlice.actions;

export default tasksSlice.reducer;
