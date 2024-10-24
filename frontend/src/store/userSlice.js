/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [
    // { username: 'admin', token: 'smkkskdcmksc5', activeChannel: 'general', isAuth: true},
  ],
}; // добавить сюда получеие токена из хранилища !token

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, { payload: { user } }) => {
      // state.messages = [...state.messages, message];
      const userState = state;
      userState.username = user.username;
      userState.token = user.token;
      userSlice.user = state;
      console.log('state in userSlice ===>', state);
    },
  },
});

export const { addToken } = userSlice.actions;

export default userSlice.reducer;
