import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

// const signupSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   lastName: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
// });

const LoginPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        // console.log(response)
        // console.log('response.data=', response.data);
        // console.log('response.data.token=', response.data.token);
        localStorage.setItem('userId', JSON.stringify(response.data));
        const userId = JSON.parse(localStorage.getItem('userId'));
        console.log('userId=', userId);

        navigate('/');
      } catch (err) {
        f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 401) {
          console.log('401 error');
        }
      }
    },
  });

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Navbar navigate={navigate} homePage={false} />
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                  <div className="card shadow-sm">
                    <div className="card-body row p-5">
                      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <img
                          src="auth_logo.jpeg"
                          className="rounded-circle"
                          alt="Войти"
                        />
                      </div>
                      <Form
                        className="col-12 col-md-6 mt-3 mt-md-0"
                        onSubmit={f.handleSubmit}
                      >
                        <h1 className="text-center mb-4">Войти</h1>
                        <Form.Group className="mb-3" controlId="username">
                          <Form.Label htmlFor="username">Ваш ник</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ваш ник"
                            name="username"
                            required
                            onChange={f.handleChange}
                            ref={inputRef}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label htmlFor="password">Пароль</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            required
                            onChange={f.handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            the username or password is incorrect
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Войти
                        </Button>
                      </Form>
                    </div>
                    <div className="card-footer p-4">
                      <div className="text-center">
                        <span>Нет аккаунта? </span>
                        <a href="/signup">Регистрация</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Toastify" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
