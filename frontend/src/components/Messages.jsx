import { ArrowRight } from 'react-bootstrap-icons';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup  } from 'react-bootstrap';

const renderMessages = (messages, activeChannel) => {
  const currentChannelMessages = messages.filter((message) => message.channelName === activeChannel)
  const messagesHtml = currentChannelMessages.map((message) => {
    const messageHtml = <div className="text-break mb-2" key={message.messageId}><b>{message.userName}</b>: {message.text}</div>;
    return messageHtml;
  })
  return messagesHtml;
}

const Messages = ({ messages, activeChannel }) => {
  const inputRef = useRef();

  useEffect(() => {
    // inputRef.current.focus();
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log('submit works');
    },
  });

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            <b># {activeChannel}</b>
          </p>
          <span className='text-muted'>0 сообщений</span>
        </div>
        <div
          id='messages-box'
          className='chat-messages overflow-auto px-5'
        >
          {renderMessages(messages, activeChannel)}
        </div>
        <div className='mt-auto px-5 py-3'>
          <form noValidate='' className='py-1 border rounded-2'>
            <div className='input-group has-validation'>
              <input
                name='body'
                aria-label='Новое сообщение'
                placeholder='Введите сообщение...'
                className='border-0 p-0 ps-2 form-control'
                ref={inputRef}
              />
              <button
                type='submit'
                className='btn btn-group-vertical'
                disabled=''
              >
                <ArrowRight />
                <span className='visually-hidden'>Отправить</span>
              </button>
            </div>
          </form>
          <Form
              className='py-1 rounded-2'
              onSubmit={f.handleSubmit}
            >
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Введите сообщение..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button id="button-addon2">
                <ArrowRight />
                <span className='visually-hidden'>Отправить</span>
              </Button>
            </InputGroup>
            {/* <Form.Group className='mb-3' controlId='username'>
              <Form.Control
                // type="username"
                placeholder='username'
                name='username'
                required
                onChange={f.handleChange}
                ref={inputRef}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button> */}
          </Form>
        </div>
      </div>
    </div>
  )
};

export default Messages;
