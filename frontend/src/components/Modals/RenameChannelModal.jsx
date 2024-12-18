import {
  Button, Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import routes from '../../utils/routes';

const ModalRemove = ({ hideModal, modalInfo }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('channels.renamed'));
  const user = useSelector((state) => state.userStore);
  const inputRef = useRef(null);
  const channelId = modalInfo.item.id;
  const channels = useSelector((state) => state.channelsStore.channels);
  const existedChanelsNames = channels.map((ch) => ch.name);

  const renameChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('modals.min'))
      .max(20, t('modals.max'))
      .required(t('modals.required'))
      .notOneOf([...existedChanelsNames, null], t('modals.uniq')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const f = useFormik({
    initialValues: {
      name: modalInfo.item.name,
    },
    validationSchema: renameChannelSchema,
    onSubmit: async (values) => {
      const { token } = user;
      const editedChannel = { name: values.name };

      try {
        await axios.patch(routes.editChannel(channelId), editedChannel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          console.log('Network Error', err);
          toast.error(t('errors.network'));
          return;
        }
        console.log('Unknown Error', err);
        toast.error(t('errors.unknown'));
      }

      hideModal();
      notify();
    },
  });

  return (
    <Modal show onHide={hideModal} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
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
              isInvalid={f.errors.name}
              value={f.values.name}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
          <br />
          <Button variant="secondary" onClick={hideModal}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={f.isSubmitting}>
            {t('modals.rename')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
