import { PlusSquare } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
  const channels = useSelector((state) => state.channelsStore.channels);
  const userStore = useSelector((state) => state.userStore);
  const { token } = userStore;

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'channels-box', delay: 0, duration: 0 });
  }, [channels]);

  useEffect(() => {
    const uploadChannels = async () => {
      try {
        const result = await axios.get(routes.channels(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const createdChannels = result.data;
        dispatch(fillChannels({ createdChannels }));
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err);
          navigate(routes.loginPage());
        }
      }
    };
    uploadChannels();
  }, [dispatch, navigate, token]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => setModalInfo({ type: 'add', item: true })}
        >
          <PlusSquare />
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
