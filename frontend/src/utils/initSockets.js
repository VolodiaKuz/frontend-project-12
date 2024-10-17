import { io } from "socket.io-client";
// import store from "../store";

const init = () => {
  const socket = io();
  socket.on('newMessage', (payload) => {
    console.log(`test socket.on('newMessage') ===>`, payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
};

export default init;