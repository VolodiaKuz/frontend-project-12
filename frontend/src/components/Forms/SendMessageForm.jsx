/* eslint-disable no-param-reassign */
import axios from 'axios';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SendMessageForm = ({ inputRef, messagesBoxRef }) => {
  const channels = useSelector((state) => state.channelsStore);
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
        body: filter.clean(values.message), channelId: channels.activeChannel.id, username,
      };

      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          placeholder="Введите сообщение..."
          onChange={f.handleChange}
          ref={inputRef}
        />
        <Button id="button-addon2" type="submit" disabled={!f.values.message.length > 0}>
          <ArrowRight />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
