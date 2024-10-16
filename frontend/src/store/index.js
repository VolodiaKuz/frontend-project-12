import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice.js';

export default configureStore({
  reducer: {
    channelsStore: tasksReducer,
  },
});
