import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import routes from '../../utils/routes';
import { logIn } from '../../store/userSlice.js';

const SignUpForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [usernameExist, setUsernameExist] = useState(false);
  const { t } = useTranslation();

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints'))
      .required(t('signup.required')),
    password: Yup.string()
      .min(6, t('signup.passMin'))
      .required(t('signup.required')),
    confirmPassword: Yup.string().required(t('signup.required')).oneOf([Yup.ref('password'), null], t('signup.mustMatch')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setUsernameExist(false);
      try {
        const response = await axios.post(
          routes.signup(),
          { username: values.username, password: values.password },
        );
        const user = response.data;
        dispatch(logIn({ user }));
        navigate(routes.mainPage());
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          console.log('Network Error', err);
          toast.error(t('errors.network'));
          return;
        }
        if (err.response.status === 409) {
          setUsernameExist(true);
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
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
        <Form.Control
          id="username"
          placeholder={t('signup.username')}
          name="username"
          required
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          ref={inputRef}
          isInvalid={(!!f.errors.username && f.touched.username) || usernameExist}
          value={f.values.username}
        />
        <Form.Control.Feedback type="invalid">
          {f.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="password"
          placeholder={t('signup.password')}
          required
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          isInvalid={(!!f.errors.password && f.touched.password) || usernameExist}
          value={f.values.password}
        />
        <Form.Control.Feedback type="invalid">
          {f.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
        <Form.Control
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder={t('signup.confirm')}
          required
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          isInvalid={(!!f.errors.confirmPassword && f.touched.confirmPassword) || usernameExist}
          value={f.values.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {usernameExist ? t('signup.alreadyExists') : f.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="primary" className="w-100" disabled={f.isSubmitting}>
        {t('signup.submit')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
