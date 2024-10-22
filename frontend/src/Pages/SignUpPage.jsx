import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  repeatPassword: Yup.string().required('Обязательное поле').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

const LoginPage = () => {
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
      repeatPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      console.log('values ===> ', values);
      console.log('f.errors ===> ',f.errors);

      try {
        const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        localStorage.setItem('userId', JSON.stringify(response.data));
        const userId = JSON.parse(localStorage.getItem('userId'));
        console.log('userId=', userId);
        navigate('/');
      } catch (err) {
        f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 409) {
          console.log('409 error');
          setUsernameExist(true)
          return;
        }
        return;
      }
    }
  });

  return (
    <>
      <div className='h-100 bg-light'>
        <div className='h-100'>
          <div className='h-100' id='chat'>
            <div className='d-flex flex-column h-100'>
              <Navbar navigate={navigate} homePage={false} />
              <div className='container-fluid h-100'>
                <div className='row justify-content-center align-content-center h-100'>
                  <div className='col-12 col-md-8 col-xxl-6'>
                    <div className='card shadow-sm'>
                      <div className='card-body row p-5'>
                        <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                          <img
                            src='auth_logo.jpeg'
                            className='rounded-circle'
                            alt='Войти'
                          />
                        </div>
                        <Form
                          className='col-12 col-md-6 mt-3 mt-md-0'
                          onSubmit={f.handleSubmit}
                        >
                          <Form.Group className='mb-3' controlId='username'>
                            <Form.Control
                              type="text"
                              placeholder='Имя'
                              name='username'
                              required
                              onChange={f.handleChange}
                              ref={inputRef}
                              isInvalid={!!f.errors.username && f.touched.username}
                            />
                            <Form.Control.Feedback type="invalid">
                              {f.errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className='mb-3' controlId='password'>
                            <Form.Control
                              type="password"
                              name='password'
                              placeholder='Пароль'
                              required
                              onChange={f.handleChange}
                              isInvalid={!!f.errors.password && f.touched.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {f.errors.password}
                            </Form.Control.Feedback> 
                          </Form.Group>
                          <Form.Group className='mb-3' controlId='repeatPassword'>
                            <Form.Control
                              type="password"
                              name='repeatPassword'
                              placeholder='Подтвердите пароль'
                              required
                              onChange={f.handleChange}
                              isInvalid={!!f.errors.repeatPassword && f.touched.repeatPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {f.errors.repeatPassword}
                            </Form.Control.Feedback>
                            {usernameExist ? <Alert variant='danger'>Такой пользователь уже существует</Alert> : null}
                          </Form.Group>
                          <Button type='submit' variant='primary' className='w-100'>
                            Зарегистрироваться
                          </Button>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='Toastify'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
