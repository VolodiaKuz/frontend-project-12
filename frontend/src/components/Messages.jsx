import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { fillMessages } from '../store/messagesSlice.js';
import SendMessageForm from './SendMessageForm.jsx';

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
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const messagesStore = useSelector((state) => state.messagesStore);
  const channels = useSelector((state) => state.channelsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, [channels.activeChannel]);

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
          <SendMessageForm inputRef={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
