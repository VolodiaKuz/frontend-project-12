import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  const navigate = useNavigate();

  const [activeChannel, setActiveChannel] = useState(1);
  const [activeChannelName, setactiveChannelName] = useState('general');

  return (
    <div className="h-100 bg-light">
      <ToastContainer />
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Navbar navigate={navigate} homePage />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <Channels
                  channels={channels}
                  activeChannel={activeChannel}
                  setActiveChannel={setActiveChannel}
                  setactiveChannelName={setactiveChannelName}
                />
                <Messages
                  messages={messages}
                  activeChannel={activeChannel}
                  activeChannelName={activeChannelName}
                />
              </div>
            </div>
          </div>
          <div className="Toastify" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
