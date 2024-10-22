import { Button, Modal } from 'react-bootstrap';
// import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const sendRemoveResponse = (channel, hideModal) => {
  const notify = () => toast.success("Канал удален");

  const token = JSON.parse(localStorage.getItem('userId')).token;

  axios.delete(`/api/v1/channels/${channel.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  hideModal();
  notify();
  // navigateOtherUsers(); // добавить редирект остальных пользователей и удаление всех сообщений канала
  // deleteChannelMessages(channel);
}

const ModalRemove = ({ hideModal, modalInfo }) => {


  return (
    <>
      <Modal show={true} onHide={hideModal} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="secondary" onClick={hideModal}>
              Отменить
            </Button>
            <Button type='submit' onClick={() => sendRemoveResponse(modalInfo.item, hideModal)} variant="primary">
              Удалить канал
            </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalRemove;
