import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../../utils/routes';
import useAuth from '../../hooks/index.jsx';
import { addToken } from '../../store/userSlice.js';

const LogInForm = ({ inputRef, setAuthError, authError }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(false);

      try {
        setAuthError(false);
        const response = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        console.log('response.data=>', response.data);
        auth.logIn();
        const user = response.data;
        dispatch(addToken({ user }));
        navigate(routes.mainPagePath());
      } catch (err) {
        // f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 401) {
          setAuthError(true);
          return;
        }
        toast.error(t('toastify.error.connectionErr'));
        throw err;
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={f.handleSubmit}
    >
      <ToastContainer />
      <h1 className="text-center mb-4">{t('login.submit')}</h1>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
        <Form.Control
          id="username"
          name="username"
          placeholder={t('login.username')}
          required
          onChange={f.handleChange}
          ref={inputRef}
          isInvalid={authError}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="password"
          placeholder={t('login.password')}
          required
          onChange={f.handleChange}
          isInvalid={authError}
        />
        <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={f.isSubmitting}>
        {t('login.submit')}
      </Button>
    </Form>
  );
};

export default LogInForm;
