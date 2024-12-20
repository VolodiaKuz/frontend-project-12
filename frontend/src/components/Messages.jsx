import { useEffect, useRef } from 'react';
import { animateScroll } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import filter from 'leo-profanity';
import axios from 'axios';

import { fillMessages } from '../store/messagesSlice.js';
import SendMessageForm from './Forms/SendMessageForm.jsx';
import routes from '../utils/routes';

const renderMessages = (messages, activeChannel) => (
  messages
    .filter((message) => message.channelId === activeChannel)
    .map((message) => (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.username}</b>
        :
        {' '}
        {message.body}
      </div>
    ))
);

const Messages = () => {
  const inputRef = useRef(null);
  const messagesBoxRef = useRef(null);
  const { t } = useTranslation();
  const messagesStore = useSelector((state) => state.messagesStore);
  const channelsStore = useSelector((state) => state.channelsStore);
  const userStore = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = userStore;

  useEffect(() => {
    setTimeout(() => inputRef.current.focus());
  }, [channelsStore.activeChannel]);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [messagesStore.messages.length]);

  useEffect(() => {
    const uploadMeassges = async () => {
      try {
        const result = await axios.get(routes.messages(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const createdMessages = result.data;
        dispatch(fillMessages({ createdMessages }));
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err);
          navigate(routes.loginPage());
        }
      }
    };

    uploadMeassges();
  }, [dispatch, navigate, token]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {filter.clean(channelsStore.activeChannel.name)}
            </b>
          </p>
          <span className="text-muted">{t('chat.messageCount.messages', { count: messagesStore.activeChannelMessagesCount })}</span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
          ref={messagesBoxRef}
        >
          {renderMessages(messagesStore.messages, channelsStore.activeChannel.id)}
        </div>
        <div className="mt-auto px-5 py-3">
          <SendMessageForm inputRef={inputRef} messagesBoxRef={messagesBoxRef} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
