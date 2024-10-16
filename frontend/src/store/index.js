import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice.js';

export default configureStore({
  reducer: {
    // BEGIN (write your solution here)
    tasksStore: tasksReducer,
    // END
  },
});
