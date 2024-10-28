import {
  Button, Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const ModalRemove = ({ hideModal, modalInfo }) => {
  const notify = () => toast.success('Канал переименован');

  const inputRef = useRef(null);
  const channelId = modalInfo.item.id;

  useEffect(() => {
    inputRef.current.value = modalInfo.item.name;
    inputRef.current.focus();
  }, [inputRef, modalInfo.item.name]);

  const f = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: (values) => {
      const { token } = JSON.parse(localStorage.getItem('userId'));

      const editedChannel = { name: values.channel };
      axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      hideModal();
      notify();
    },
  });

  return (
    <Modal show onHide={hideModal} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <Form.Label htmlFor="channel">Имя канала</Form.Label>
            <FormControl
              required
              data-testid="input-body"
              name="channel"
              onChange={f.handleChange}
              ref={inputRef}
            />
          </FormGroup>
          <br />
          <Button variant="secondary" onClick={hideModal}>
            Отменить
          </Button>
          <Button type="submit" variant="primary">
            Переименовать канал
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
