import { ArrowRight } from 'react-bootstrap-icons';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const renderMessages = (messages, activeChannel) => {
  // console.log(messages);
  // console.log(activeChannel);
  const currentChannelMessages = messages.filter((message) => message.channelId === activeChannel)
  // console.log('currentChannelMessages ==>', currentChannelMessages);
  const messagesHtml = currentChannelMessages.map((message) => {
    const messageHtml = <div className="text-break mb-2" key={message.id}><b>{message.username}</b>: {message.body}</div>;
    return messageHtml;
  })
  return messagesHtml;
}

const Messages = ({ activeChannel, activeChannelName }) => {
  const inputRef = useRef();
  // Добавить Yup для отключения кнопки если сооьщение не введено
  // disabled={!formik.isValid}

  const messages = useSelector((state) => state.messagesStore.messages);

  useEffect(() => {
    inputRef.current.focus();
  });

  const f = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values) => {
      const token = JSON.parse(localStorage.getItem('userId')).token;

      const newMessage = {
        body: values.message, channelId: activeChannel, username: 'admin'
      }

      axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      inputRef.current.value='';
      inputRef.current.focus();
    

    },
  });

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            <b># {activeChannelName}</b>
          </p>
          <span className='text-muted'>? сообщений</span>
        </div>
        <div
          id='messages-box'
          className='chat-messages overflow-auto px-5'
        >
          {renderMessages(messages, activeChannel)}
        </div>
        <div className='mt-auto px-5 py-3'>
          <Form
              className='py-1 rounded-2'
              onSubmit={f.handleSubmit}
            >
            <InputGroup className="mb-3">
              <Form.Control
                name='message'
                placeholder="Введите сообщение..."
                aria-label='Новое сообщение'
                aria-describedby="basic-addon2"
                onChange={f.handleChange}
                ref={inputRef}
              />
              <Button id="button-addon2" type='submit'>
                <ArrowRight />
                <span className='visually-hidden'>Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  )
};

export default Messages;
