import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import routes from '../../utils/routes';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string().required('Обязательное поле').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [usernameExist, setUsernameExist] = useState(false);

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
      try {
        const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate(routes.mainPagePath());
      } catch (err) {
        f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 409) {
          setUsernameExist(true);
        }
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={f.handleSubmit}
    >
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
        <Form.Control
          id="username"
          type="text"
          placeholder="Имя пользователя"
          name="username"
          required
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          ref={inputRef}
          isInvalid={!!f.errors.username && f.touched.username}
        />
        <Form.Control.Feedback type="invalid">
          {f.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Пароль"
          required
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          isInvalid={!!f.errors.password && f.touched.password}
        />
        <Form.Control.Feedback type="invalid">
          {f.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          required
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          isInvalid={!!f.errors.confirmPassword && f.touched.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {f.errors.confirmPassword}
        </Form.Control.Feedback>
        {usernameExist ? <Alert variant="danger">Такой пользователь уже существует</Alert> : null}
      </Form.Group>
      <Button type="submit" variant="primary" className="w-100">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default SignUpForm;
