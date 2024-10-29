import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import routes from '../../utils/routes';

const LogInForm = ({ inputRef, setAuthError, authError }) => {
  const navigate = useNavigate();

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(false);
      try {
        const response = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate(routes.mainPagePath());
      } catch (err) {
        // f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 401) {
          setAuthError(true);
        }
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={f.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="mb-3">
        <Form.Label controlid="username">Ваш ник</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ваш ник"
          name="username"
          required
          onChange={f.handleChange}
          ref={inputRef}
          isInvalid={authError}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label controlid="password">Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Пароль"
          required
          onChange={f.handleChange}
          isInvalid={authError}
        />
        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  );
};

export default LogInForm;
