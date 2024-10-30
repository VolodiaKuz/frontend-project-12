import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setActive } from '../../store/channelsSlice.js';
import { countMessages } from '../../store/messagesSlice.js';
import store from '../../store/index.js';

const sendRemoveResponse = (currentChannel, hideModal, user, messagesCount) => {
  const { dispatch } = store;
  const notify = () => toast.success('Канал удалён');
  const { token } = user;

  axios.delete(`/api/v1/channels/${currentChannel.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  hideModal();
  notify();
  const channel = { id: '1', name: 'general' };
  dispatch(setActive({ channel }));
  dispatch(countMessages({ count: messagesCount }));
  // добавить удаление всех сообщений канала
  // dispatch(deleteChannelMessages(channel));
};

const ModalRemove = ({ hideModal, modalInfo }) => {
  const user = useSelector((state) => state.userStore);
  const { messages } = store.getState().messagesStore;
  const generalChatMessagesCount = messages.filter((el) => el.channelId === '1').length;

  return (
    <Modal show onHide={hideModal} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Отменить
        </Button>
        <Button type="submit" onClick={() => sendRemoveResponse(modalInfo.item, hideModal, user, generalChatMessagesCount)} variant="primary">
          Удалить канал
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemove;
