import {
  Button, Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  channel: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
});

const ModalAdd = ({ hideModal }) => {
  const inputRef = useRef();
  const notify = () => toast.success('Канал создан');

  useEffect(() => {
    inputRef.current.focus(); // фокус почему-тто не работает
  });

  const f = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log('test');
      const { token } = JSON.parse(localStorage.getItem('userId'));

      const newChannel = { name: values.channel };

      axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // modalInfo.toast();
      hideModal();
      notify();
    },
  });

  return (
    <Modal show onHide={hideModal} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
              isInvalid={!!f.errors.channel && f.touched.channel}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.channel}
            </Form.Control.Feedback>
          </FormGroup>
          <br />
          <Button variant="secondary" onClick={hideModal}>
            Отменить
          </Button>
          <Button type="submit" variant="primary">
            Добавить канал
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
