import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
// import { addToken } from '../store/userSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [authError, setAuthError] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        const user = JSON.parse(localStorage.getItem('userId'));
        console.log('userId=', user);
        // dispatch(addToken({ user }));
        // const test = useSelector((state) => state.userStore.user);
        // console.log('test =>>>>>>>', test);

        navigate('/');
      } catch (err) {
        f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 401) {
          console.log('401 error');
        }
        setAuthError(true);
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
                        <Form.Group className="mb-3">
                          <Form.Label controlid="username">Ваш ник</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ваш ник"
                            name="username"
                            required
                            onChange={f.handleChange}
                            ref={inputRef}
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
                          />
                          {authError ? <Alert variant="danger">Неверные имя пользователя или пароль</Alert> : null}
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
