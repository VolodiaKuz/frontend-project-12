import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="h-100 bg-light">
      <ToastContainer />
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Navbar navigate={navigate} homePage />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <Channels />
                <Messages />
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
