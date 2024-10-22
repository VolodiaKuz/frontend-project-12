import { Button, Modal, FormGroup, FormControl, Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

const ModalRemove = ({ hideModal, modalInfo }) => {
  console.log('modalInfo =======>',modalInfo);

  const inputRef = useRef(null);
  const channelId = modalInfo.item.id;
  console.log('channelId', channelId);

  useEffect(() => {
    inputRef.current.focus(); // фокус почему-тто не работает
  }, [inputRef]);

  const f = useFormik({
    initialValues: {
      channel: ''
    },
    onSubmit: (values) => {
      const token = JSON.parse(localStorage.getItem('userId')).token;

      const editedChannel = { name: values.channel };
      axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      hideModal();
    },
  });

  return (
    <>
      <Modal show={true} onHide={hideModal} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={f.handleSubmit}>
            <FormGroup>
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
            <Button type='submit' variant="primary">
              Переименовать канал
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalRemove;
