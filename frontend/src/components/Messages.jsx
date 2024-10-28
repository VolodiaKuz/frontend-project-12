import { ArrowRight } from 'react-bootstrap-icons';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import filter from 'leo-profanity';
import { fillMessages } from '../store/messagesSlice.js';

const renderMessages = (messages, activeChannel) => {
  const currentChannelMessages = messages.filter((message) => message.channelId === activeChannel);
  const messagesHtml = currentChannelMessages.map((message) => {
    const messageHtml = (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.username}</b>
        :
        {' '}
        {message.body}
      </div>
    );
    return messageHtml;
  });
  return messagesHtml;
};

const Messages = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const messagesStore = useSelector((state) => state.messagesStore);
  const channels = useSelector((state) => state.channelsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    const uploadChannels = async () => {
      if (!localStorage.getItem('userId')) return [];
      const { token } = JSON.parse(localStorage.getItem('userId'));

      const result = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const createdMessages = result.data;
      dispatch(fillMessages({ createdMessages }));
      return null;
    };

    uploadChannels();
  }, [dispatch]);

  const f = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const { token, username } = JSON.parse(localStorage.getItem('userId'));

      const newMessage = {
        body: filter.clean(values.message), channelId: channels.activeChannel.id, username,
      };

      axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      inputRef.current.value = '';
      inputRef.current.focus();
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {channels.activeChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('chatBox.messages', { count: messagesStore.activeChannelMessagesCount })}</span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {renderMessages(messagesStore.messages, channels.activeChannel.id)}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            className="py-1 rounded-2"
            onSubmit={f.handleSubmit}
          >
            <InputGroup className="mb-3">
              <Form.Control
                name="message"
                placeholder="Введите сообщение..."
                aria-label="Новое сообщение"
                aria-describedby="basic-addon2"
                onChange={f.handleChange}
                ref={inputRef}
              />
              <Button id="button-addon2" type="submit" disabled={!f.values.message.length > 0}>
                <ArrowRight />
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
