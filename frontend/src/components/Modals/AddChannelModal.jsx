import {
  Button, Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../store/channelsSlice.js';
import { countMessages } from '../../store/messagesSlice.js';

const ModalAdd = ({ hideModal }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const notify = () => toast.success(t('channels.created'));
  const user = useSelector((state) => state.userStore);
  const channels = useSelector((state) => state.channelsStore.channels);
  const existedChanelsNames = channels.map((ch) => ch.name);
  const [channelExist, setChannelExist] = useState(false);

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('modals.min'))
      .max(20, t('modals.max'))
      .required(t('modals.required')),
  });

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

      try {
        const newChannelResponse = await axios.post('/api/v1/channels', newChannel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        hideModal();
        notify();
        const channel = newChannelResponse.data;
        dispatch(setActive({ channel }));
        dispatch(countMessages({ count: 0 }));
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Modal show onHide={hideModal} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <Form.Label htmlFor="name">{t('modals.channelName')}</Form.Label>
            <FormControl
              id="name"
              name="name"
              required
              onChange={f.handleChange}
              ref={inputRef}
              isInvalid={channelExist || f.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {channelExist && t('modals.uniq')}
              {f.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
          <br />
          <Button variant="secondary" onClick={hideModal}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={f.isSubmitting}>
            {t('modals.add')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
