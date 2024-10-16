import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [{ channelId: 1, text: 'testing work of store', channelName: 'test channel' }],
};

const tasksSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addTask: (state, { payload: { task } }) => {
      // BEGIN (write your solution here)
      state.tasks = [task, ...state.tasks];
      // END
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
