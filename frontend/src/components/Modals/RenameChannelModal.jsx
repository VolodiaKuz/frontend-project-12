import {
  Button, Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
});

const ModalRemove = ({ hideModal, modalInfo }) => {
  const notify = () => toast.success('Канал переименован');
  const user = useSelector((state) => state.userStore);
  const inputRef = useRef(null);
  const channelId = modalInfo.item.id;
  const channels = useSelector((state) => state.channelsStore.channels);
  const existedChanelsNames = channels.map((ch) => ch.name);
  const [channelExist, setChannelExist] = useState(false);

  useEffect(() => {
    inputRef.current.value = modalInfo.item.name;
    inputRef.current.focus();
  }, [inputRef, modalInfo.item.name]);

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
      const editedChannel = { name: values.name };
      await axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
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
            <Form.Label htmlFor="name">Имя канала</Form.Label>
            <FormControl
              id="name"
              name="name"
              required
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              ref={inputRef}
              isInvalid={channelExist || f.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {channelExist && 'Должно быть уникальным'}
              {f.errors.name}
            </Form.Control.Feedback>
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
