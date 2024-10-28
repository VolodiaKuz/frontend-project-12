import { PlusSquare } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fillChannels } from '../store/channelsSlice.js';
import Modal from './Modal.jsx';
import Channel from './Channel.jsx';

const Channels = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadChannels = async () => {
      if (!localStorage.getItem('userId')) return [];
      const { token } = JSON.parse(localStorage.getItem('userId'));

      const result = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        <Channel setModalInfo={setModalInfo} />
      </ul>
      <Modal modalInfo={modalInfo} hideModal={hideModal} />
    </div>
  );
};

export default Channels;
