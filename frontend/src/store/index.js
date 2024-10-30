import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import userReducer from './userSlice.js';

export default configureStore({
  reducer: {
    channelsStore: channelsReducer,
    messagesStore: messagesReducer,
    userStore: userReducer,
  },
});
