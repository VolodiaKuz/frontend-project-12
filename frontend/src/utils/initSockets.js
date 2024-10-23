import { io } from 'socket.io-client';
import { addMessage } from '../store/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../store/channelsSlice.js';

const init = (dispatch) => {
  // const dispatch = useDispatch();
  // const message = { id: '1', body: 'new message', channelId: '1', username: 'admin' };

  const socket = io();
  socket.on('newMessage', (payload) => {
    console.log('test socket.on(\'newMessage\') ===>', payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    const message = payload;
    dispatch(addMessage({ message }));
  });
  socket.on('newChannel', (payload) => {
    console.log('test socket.on(\'newChannel\') ===>', payload); // => { id: 6, name: "new channel", removable: true }
    const channel = payload;
    dispatch(addChannel({ channel }));
  });
  socket.on('removeChannel', (payload) => {
    console.log('test socket.on(\'removeChannel\') ===>', payload); // { id: 6 };
    const channel = payload;
    dispatch(removeChannel({ channel }));
  });
  socket.on('renameChannel', (payload) => {
    console.log('test socket.on(\'renameChannel\') ===>', payload); // { id: 7, name: "new name channel", removable: true }
    const channel = payload;
    dispatch(renameChannel({ channel }));
  });
};

export default init;
