import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../../utils/routes';
import { logIn } from '../../store/userSlice.js';

const LogInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(false);

      try {
        const response = await axios.post(routes.login(), values);
        const user = response.data;
        dispatch(logIn({ user }));
        navigate(routes.mainPage());
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          console.log('Network Error', err);
          toast.error(t('errors.network'));
          return;
        }
        if (err.status === 401) {
          console.log('Unauthorized Error', err);
          setAuthError(true);
          inputRef.current.select();
          return;
        }
        console.log('Unknown Error', err);
        toast.error(t('errors.unknown'));
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={f.handleSubmit}
    >
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
          value={f.values.username}
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
          value={f.values.password}
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
