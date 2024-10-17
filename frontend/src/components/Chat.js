import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { PlusSquare, ArrowRight } from 'react-bootstrap-icons';
// import 'bootstrap-icons';
import axios from 'axios';

const renderChannels = (channels, activeChannel, setActiveChannel) => {
  const channelsHtml = channels.map((channel) => {
    // const buttonClasses = `w-100 rounded-0 text-start btn ${channel.active ? 'btn-secondary' : ''}`;
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.channelName === activeChannel ? 'btn-secondary' : ''}`;
    const channelHtml =
      <li key={channel.channelId}>
        <button
          type='button'
          className={buttonClasses}
          onClick={() => setActiveChannel(channel.channelName)}
        >
          <span className='me-1'>#</span>{channel.channelName}
        </button>
      </li>
    return channelHtml;
  })
  return channelsHtml;
}

const renderMessages = (messages, activeChannel) => {
  const currentChannelMessages = messages.filter((message) => message.channelName === activeChannel)
  const messagesHtml = currentChannelMessages.map((message) => {
    const messageHtml = <div className="text-break mb-2" key={message.messageId}><b>{message.userName}</b>: {message.text}</div>;
    return messageHtml;
  })
  return messagesHtml;
}

const exitButton = (navigate) => () => {
  console.log('exit works');
  localStorage.clear();
  navigate('/login');
}

const Navbar = ({ navigate }) => {
  return (
    <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          Hexlet Chat
        </a>
        <button type='button' className='btn btn-primary' onClick={exitButton(navigate)}>
          Выйти
        </button>
      </div>
    </nav>
  )
};


function Chat() {
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  // console.log('tasks in HomePage', channels);
  // console.log('messages in HomePage', messages);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
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
            <Navbar navigate={navigate} />
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
              <div className='row h-100 bg-white flex-md-row'>
                {/* <Channels />
                <Messages /> */}
                <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                  <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                    <b>Каналы</b>
                    <button
                      type='button'
                      className='p-0 text-primary btn btn-group-vertical'
                    >
                      <PlusSquare />
                      <span className='visually-hidden'>+</span>
                    </button>
                  </div>
                  <ul
                    id='channels-box'
                    className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
                  >
                    {renderChannels(channels, activeChannel, setActiveChannel)}
                  </ul>
                </div>
                <div className='col p-0 h-100'>
                  <div className='d-flex flex-column h-100'>
                    <div className='bg-light mb-4 p-3 shadow-sm small'>
                      <p className='m-0'>
                        <b># {activeChannel}</b>
                      </p>
                      <span className='text-muted'>0 сообщений</span>
                    </div>
                    <div
                      id='messages-box'
                      className='chat-messages overflow-auto px-5'
                    >
                      {renderMessages(messages, activeChannel)}
                    </div>
                    <div className='mt-auto px-5 py-3'>
                      <form noValidate='' className='py-1 border rounded-2'>
                        <div className='input-group has-validation'>
                          <input
                            name='body'
                            aria-label='Новое сообщение'
                            placeholder='Введите сообщение...'
                            className='border-0 p-0 ps-2 form-control'
                            ref={inputRef}
                          />
                          <button
                            type='submit'
                            className='btn btn-group-vertical'
                            disabled=''
                          >
                            <ArrowRight />
                            <span className='visually-hidden'>Отправить</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
