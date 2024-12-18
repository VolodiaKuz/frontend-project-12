/* eslint-disable no-param-reassign */
import axios from 'axios';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import routes from '../../utils/routes';

const SendMessageForm = ({ inputRef, messagesBoxRef }) => {
  const channelsStore = useSelector((state) => state.channelsStore);
  const user = useSelector((state) => state.userStore);
  const { t } = useTranslation();
  useEffect(() => {
    messagesBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  });

  const f = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      const { token, username } = user;

      const newMessage = {
        body: filter.clean(values.message), channelId: channelsStore.activeChannel.id, username,
      };

      try {
        await axios.post(routes.messages(), newMessage, {
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
      f.resetForm();
      inputRef.current.value = '';
      inputRef.current.focus();
    },
  });

  return (
    <Form
      className="py-1 rounded-2"
      onSubmit={f.handleSubmit}
    >
      <InputGroup className="mb-3">
        <Form.Control
          name="message"
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.newMessagePlaceholder')}
          onChange={f.handleChange}
          ref={inputRef}
          value={f.values.message}
        />
        <Button id="button-addon2" type="submit" disabled={f.values.message === ''}>
          <ArrowRight />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
