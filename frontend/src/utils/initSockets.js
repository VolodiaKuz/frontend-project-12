import { io } from "socket.io-client";
import { addMessage } from '../store/messagesSlice.js';

const init = (dispatch) => {
  // const dispatch = useDispatch();
  // const message = { id: '1', body: 'new message', channelId: '1', username: 'admin' };

  const socket = io();
  socket.on('newMessage', (payload) => {
    console.log(`test socket.on('newMessage') ===>`, payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    const message = payload;
    dispatch(addMessage({ message }))
  });
};

export default init;