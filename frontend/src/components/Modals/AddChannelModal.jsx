import {
  Button, Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../store/channelsSlice.js';

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
});

const ModalAdd = ({ hideModal }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const notify = () => toast.success('Канал создан');
  const user = useSelector((state) => state.userStore);
  const channels = useSelector((state) => state.channelsStore.channels);
  const existedChanelsNames = channels.map((ch) => ch.name);
  const [channelExist, setChannelExist] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  });

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setChannelExist(false);
      if (existedChanelsNames.includes(values.name)) {
        setChannelExist(true);
        return;
      }
      const { token } = user;
      const newChannel = { name: values.name };
      const newChannelResponse = await axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      hideModal();
      notify();
      const channel = newChannelResponse.data;
      dispatch(setActive({ channel }));
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
            <Form.Label htmlFor="name">Имя канала</Form.Label>
            <FormControl
              id="name"
              name="name"
              required
              onChange={f.handleChange}
              ref={inputRef}
              isInvalid={channelExist}
            />
            <Form.Control.Feedback type="invalid">
              Должно быть уникальным
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
