import { Button, Modal } from 'react-bootstrap';
// import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const sendRemoveResponse = (channel, hideModal) => {
  const notify = () => toast.success('Канал удалён');

  const { token } = JSON.parse(localStorage.getItem('userId'));

  axios.delete(`/api/v1/channels/${channel.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  hideModal();
  notify();
  // navigateOtherUsers();
  // добавить редирект остальных пользователей и удаление всех сообщений канала
  // deleteChannelMessages(channel);
};

const ModalRemove = ({ hideModal, modalInfo }) => (
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
      <Button type="submit" onClick={() => sendRemoveResponse(modalInfo.item, hideModal)} variant="primary">
        Удалить канал
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalRemove;
