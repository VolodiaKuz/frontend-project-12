import { useSelector } from 'react-redux';

// const messageHtml = <div class="text-break mb-2"><b>admin</b>: test mes</div>;

const renderChannels = (channels) => {
  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.active ? 'btn-secondary' : ''}`;
    const channelHtml =
      <li key={channel.channelId}>
        <button
          type='button'
          className={buttonClasses}
        >
          <span className='me-1'>#</span>{channel.channelName}
        </button>
      </li>
    return channelHtml;
  })
  return channelsHtml;
}

const renderMessages = (messages, activeChannel) => {
  const currentChannelMessages = messages.filter((message) => message.channelId === activeChannel)
  const messagesHtml = currentChannelMessages.map((message) => {
    const messageHtml = <div className="text-break mb-2" key={message.messageId}><b>{message.userName}</b>: {message.text}</div>;
    return messageHtml;
  })
  return messagesHtml;
}

const exitButton = () => {
  console.log('exit works');
  localStorage.clear();
  //доюавить навигацию на страницу LoginPage
}

function Chat() {
  const currentChannel = 'general';
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  console.log('tasks in HomePage', channels);
  console.log('messages in HomePage', messages);

  return (
    <div className='h-100 bg-light'>
      <div className='h-100'>
        <div className='h-100' id='chat'>
          <div className='d-flex flex-column h-100'>
            <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
              <div className='container'>
                <a className='navbar-brand' href='/'>
                  Hexlet Chat
                </a>
                <button type='button' className='btn btn-primary' onClick={exitButton}>
                  Выйти
                </button>
              </div>
            </nav>
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
              <div className='row h-100 bg-white flex-md-row'>
                <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                  <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                    <b>Каналы</b>
                    <button
                      type='button'
                      className='p-0 text-primary btn btn-group-vertical'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 16 16'
                        width='20'
                        height='20'
                        fill='currentColor'
                      >
                        <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'></path>
                        <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4'></path>
                      </svg>
                      <span className='visually-hidden'>+</span>
                    </button>
                  </div>
                  <ul
                    id='channels-box'
                    className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
                  >
                    {renderChannels(channels)}
                  </ul>
                </div>
                <div className='col p-0 h-100'>
                  <div className='d-flex flex-column h-100'>
                    <div className='bg-light mb-4 p-3 shadow-sm small'>
                      <p className='m-0'>
                        <b># {currentChannel}</b>
                      </p>
                      <span className='text-muted'>0 сообщений</span>
                    </div>
                    <div
                      id='messages-box'
                      className='chat-messages overflow-auto px-5'
                    >
                      {renderMessages(messages, 1)}
                    </div>
                    <div className='mt-auto px-5 py-3'>
                      <form noValidate='' className='py-1 border rounded-2'>
                        <div className='input-group has-validation'>
                          <input
                            name='body'
                            aria-label='Новое сообщение'
                            placeholder='Введите сообщение...'
                            className='border-0 p-0 ps-2 form-control'
                          />
                          <button
                            type='submit'
                            className='btn btn-group-vertical'
                            disabled=''
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 16 16'
                              width='20'
                              height='20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'
                              ></path>
                            </svg>
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