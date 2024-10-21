import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Channels from './Channels'
import Messages from './Messages'
// import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';


const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  switch (modalInfo.type) {
    case 'add':
      return <AddChannelModal hideModal={hideModal}/>;
    case 'remove':
      return <RemoveChannelModal hideModal={hideModal}/>;
    case 'rename':
      return <RenameChannelModal hideModal={hideModal}/>;
    default:
      return;
  }
};

const Chat = () => {
  const channels = useSelector((state) => state.channelsStore.channels);
  const messages = useSelector((state) => state.messagesStore.messages);
  const navigate = useNavigate();

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });

  const [activeChannel, setActiveChannel] = useState(1);
  const [activeChannelName, setactiveChannelName] = useState('general');

  return (
    <>
      {renderModal({ modalInfo, hideModal })}
      <div className='h-100 bg-light'>
      <div className='h-100'>
        <div className='h-100' id='chat'>
          <div className='d-flex flex-column h-100'>
            <Navbar navigate={navigate} homePage={true} />
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
              <div className='row h-100 bg-white flex-md-row'>
                <Channels 
                  channels={channels} 
                  activeChannel={activeChannel} 
                  setActiveChannel={setActiveChannel}
                  setactiveChannelName={setactiveChannelName}
                  setModalInfo={setModalInfo}
                />
                <Messages messages={messages} activeChannel={activeChannel} activeChannelName={activeChannelName} />
              </div>
            </div>
          </div>
          <div className='Toastify'></div>
        </div>
      </div>
    </div></>

  )
}

export default Chat;
