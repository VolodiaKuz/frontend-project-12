/* eslint-disable no-param-reassign */
import axios from 'axios';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SendMessageForm = ({ inputRef, messagesBoxRef }) => {
  const channels = useSelector((state) => state.channelsStore);
  const user = useSelector((state) => state.userStore);
  useEffect(() => {
    messagesBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  });

  const f = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      // const { token, username } = JSON.parse(localStorage.getItem('userId'));
      const { token, username } = user;

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
  );
};

export default SendMessageForm;
