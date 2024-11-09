import { io } from 'socket.io-client';

import { addMessage } from '../store/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../store/channelsSlice.js';
import store from '../store/index.js';

const init = () => {
  const { dispatch } = store;

  const socket = io();
  socket.on('newMessage', (payload) => {
    const message = payload;
    dispatch(addMessage({ message }));
  });
  socket.on('newChannel', (payload) => {
    const channel = payload;
    dispatch(addChannel({ channel }));
  });
  socket.on('removeChannel', (payload) => {
    const channel = payload;
    dispatch(removeChannel({ channel }));
  });
  socket.on('renameChannel', (payload) => {
    const channel = payload;
    dispatch(renameChannel({ channel }));
  });
};

export default init;
