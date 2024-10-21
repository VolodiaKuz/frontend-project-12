import { Button, Modal, FormGroup, FormControl, Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

const ModalRemove = ({ hideModal }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus(); // фокус почему-тто не работает
  });

  const f = useFormik({
    initialValues: {
      channel: ''
    },
    onSubmit: (values) => {
      console.log(values);
      console.log('test');
      hideModal();
      const token = JSON.parse(localStorage.getItem('userId')).token;

      const newChannel = { name: values.channel };

      axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  });

  return (
    <>
      <Modal show={true} onHide={hideModal} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
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
              Добавить канал
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalRemove;
