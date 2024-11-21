import React from 'react';

import Navbar from '../components/Navbar';
import Channels from '../components/Channels';
import Messages from '../components/Messages';

const HomePage = () => (
  <div className="h-100 bg-light">
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar homePage />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <Channels />
              <Messages />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
