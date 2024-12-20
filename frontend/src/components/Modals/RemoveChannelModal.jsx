import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import routes from '../../utils/routes';
import { setDefaultChannelActive } from '../../store/channelsSlice.js';
import { countMessages } from '../../store/messagesSlice.js';

const ModalRemove = ({ hideModal, modalInfo }) => {
  const currentChannel = modalInfo.item;
  const user = useSelector((state) => state.userStore);
  const channels = useSelector((state) => state.channelsStore);
  const { messages } = useSelector((state) => state.messagesStore);
  const messagesCount = messages.filter((el) => el.channelId === '1').length;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notify = () => toast.success(t('channels.removed'));
  const { token } = user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);

    try {
      await axios.delete(routes.editChannel(currentChannel.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.delete(routes.editMessages(currentChannel.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        console.log('Network Error', err);
        toast.error(t('errors.network'));
        return;
      }
      console.log('Unknown Error', err);
      toast.error(t('errors.unknown'));
    }

    hideModal();
    notify();
    dispatch(setDefaultChannelActive(channels));
    dispatch(countMessages({ count: messagesCount }));
  };

  return (
    <Modal show onHide={hideModal} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          {t('modals.cancel')}
        </Button>
        <Button
          onClick={handleRemove}
          variant="danger"
          disabled={isSubmitting}
        >
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemove;
