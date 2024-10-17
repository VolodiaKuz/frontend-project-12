import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Channels from './Channels'
import Messages from './Messages'
import axios from 'axios';

const Chat = () => {
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  // console.log('tasks in HomePage', channels);
  // console.log('messages in HomePage', messages);
  const navigate = useNavigate();

  useEffect(() => {
    // inputRef.current.focus();
    const token = JSON.parse(localStorage.getItem('userId')).token;

    const newMessage = {
      body: 'new message', channelId: '1', username: 'admin'
    }

    axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response.data); // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
    })

  }, []);

  const [activeChannel, setActiveChannel] = useState('general');

  return (
    <div className='h-100 bg-light'>
      <div className='h-100'>
        <div className='h-100' id='chat'>
          <div className='d-flex flex-column h-100'>
            <Navbar navigate={navigate} homePage={true} />
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
              <div className='row h-100 bg-white flex-md-row'>
                <Channels channels={channels} activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
                <Messages messages={messages} activeChannel={activeChannel} />
              </div>
            </div>
          </div>
          <div className='Toastify'></div>
        </div>
      </div>
    </div>
  )
}

export default Chat;
