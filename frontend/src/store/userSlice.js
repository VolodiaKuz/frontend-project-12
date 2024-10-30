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
      state.token = user.token;
      state.username = user.username;
    },
  },
});

export const { addToken } = userSlice.actions;

export default userSlice.reducer;
