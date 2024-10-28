import { PlusSquare } from 'react-bootstrap-icons';
import { Button, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { current } from '@reduxjs/toolkit';
import { fillChannels, setActive } from '../store/channelsSlice.js';
import { countMessages } from '../store/messagesSlice.js';
import store from '../store/index.js';
import Modal from './Modal.jsx';

const handleActiveChannel = (channel) => {
  const { dispatch } = store;
  dispatch(setActive({ channel }));
  const { messages } = store.getState().messagesStore;
  const test = messages.filter((el) => el.channelId === channel.id);
  dispatch(countMessages({ count: test.length }));
};

const renderRemovableChannel = (
  channel,
  setModalInfo,
  activeChannel,
) => {
  const buttonClasses = 'w-100 rounded-0 text-start';
  const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;

  return (
    <li key={channel.id}>
      <Dropdown className={buttonClasses}>
        <Button
          variant={buttonVariant}
          onClick={() => handleActiveChannel(channel)}
        >
          #
          {' '}
          {filter.clean(channel.name)}
        </Button>

        <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setModalInfo(({ type: 'remove', item: channel }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => setModalInfo(({ type: 'rename', item: channel }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const RenderChannels = ({ setModalInfo }) => {
  // const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsStore.channels);
  const activeChannel = useSelector((state) => state.channelsStore.activeChannel);
  console.log('activeChannel=>', activeChannel);

  const channelsHtml = channels.map((channel) => {
    const buttonClasses = `w-100 rounded-0 text-start btn ${channel.id === activeChannel.id ? 'btn-secondary' : ''}`;
    const buttonVariant = `${channel.id === activeChannel.id ? 'secondary' : 'light'}`;
    if (channel.removable) {
      return renderRemovableChannel(
        channel,
        setModalInfo,
        activeChannel,
      );
    }
    const channelHtml = (
      <li key={channel.id}>
        <Button
          variant={buttonVariant}
          className={buttonClasses}
          onClick={() => handleActiveChannel(channel)}
        >
          #
          {' '}
          {channel.name}
        </Button>
      </li>
    );
    return channelHtml;
  });
  return channelsHtml;
};

const Channels = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadChannels = async () => {
      console.log(localStorage.getItem('userId'));
      if (!localStorage.getItem('userId')) return [];
      const { token } = JSON.parse(localStorage.getItem('userId'));

      const result = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('result.data ====> ', result.data);
      const createdChannels = result.data;
      dispatch(fillChannels({ createdChannels }));
      return null;
    };
    uploadChannels();
    // handleActiveChannel({ id: 1, name: 'general' }, setActiveChannel, setactiveChannelName);
    // добавить try/catch и ошибку 401
  }, [dispatch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <PlusSquare onClick={() => setModalInfo({ type: 'add', item: true })} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        <RenderChannels setModalInfo={setModalInfo} />
      </ul>
      <Modal modalInfo={modalInfo} hideModal={hideModal} />
    </div>
  );
};

export default Channels;
