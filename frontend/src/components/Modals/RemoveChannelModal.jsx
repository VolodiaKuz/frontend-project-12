import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setActive } from '../../store/channelsSlice.js';
import { countMessages } from '../../store/messagesSlice.js';
import store from '../../store/index.js';

// const sendRemoveResponse = async (currentChannel, hideModal, user, messagesCount, t) => {
//   const { dispatch } = store;
//   const notify = () => toast.success(t('channels.removed'));
//   const { token } = user;

//   await axios.delete(`/api/v1/channels/${currentChannel.id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   hideModal();
//   notify();
//   const channel = { id: '1', name: 'general' };
//   dispatch(setActive({ channel }));
//   dispatch(countMessages({ count: messagesCount }));
//   // добавить удаление всех сообщений канала
//   // dispatch(deleteChannelMessages(channel));
// };

const ModalRemove = ({ hideModal, modalInfo }) => {
  const currentChannel = modalInfo.item;
  const user = useSelector((state) => state.userStore);
  const { messages } = store.getState().messagesStore;
  const messagesCount = messages.filter((el) => el.channelId === '1').length;
  const { t } = useTranslation();
  const { dispatch } = store;
  const notify = () => toast.success(t('channels.removed'));
  const { token } = user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);

    try {
      await axios.delete(`/api/v1/channels/${currentChannel.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.delete(`/api/v1/messages/${currentChannel.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    hideModal();
    notify();
    const channel = { id: '1', name: 'general' };
    dispatch(setActive({ channel }));
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
          type="submit"
          // onClick={() => sendRemoveResponse(
          //   modalInfo.item,
          //   hideModal,
          //   user,
          //   generalChatMessagesCount,
          //   t,
          // )}
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
