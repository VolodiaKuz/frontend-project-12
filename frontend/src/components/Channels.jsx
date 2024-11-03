import { PlusSquare } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fillChannels } from '../store/channelsSlice.js';
import Modal from './Modals/Modal.jsx';
import Channel from './Channel.jsx';
import routes from '../utils/routes';

const Channels = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const uploadChannels = async () => {
      if (!localStorage.getItem('userId')) return [];
      try {
        const { token } = JSON.parse(localStorage.getItem('userId'));
        const result = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const createdChannels = result.data;
        dispatch(fillChannels({ createdChannels }));
      } catch (err) {
        if (err.response.status === 401) {
          navigate(routes.loginPage());
          return null;
        }
        throw err;
      }
      return null;
    };
    uploadChannels();
  }, [dispatch, navigate]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
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
