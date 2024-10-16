import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // axios
  //   .post('/api/v1/login', { username: 'admin', password: 'admin' })
  //   .then(console.log)
  //   .catch(console.error);
  const navigate = useNavigate();

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      // console.log(values);
      // console.log('submit works');

      try {
        const response = await axios.post('/api/v1/login', values);
        // console.log(response)
        console.log('response.data=', response.data);
        console.log('response.data.token=', response.data.token);
        localStorage.setItem('userId', JSON.stringify(response.data));
        // auth.logIn(response.data.token, values.username);
        const userId = JSON.parse(localStorage.getItem('userId'));
        console.log('userId=', userId);

        navigate('/');
      } catch (err) {
        f.setSubmitting(false);
        // f.isSubmitting
        if (err.response.status === 401) {
          console.log('401 error');
          return;
        }
        return;
      }
    },
  });

  return (
    <>
      <div className='h-100 bg-light'>
        <div className='h-100'>
          <div className='h-100' id='chat'>
            <div className='d-flex flex-column h-100'>
              <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
                <div className='container'>
                  <a className='navbar-brand' href='/'>
                    Hexlet Chat
                  </a>
                  <button type='button' className='btn btn-primary'>
                    Войти
                  </button>
                </div>
              </nav>
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
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              // type="username"
                              placeholder='username'
                              name='username'
                              required
                              onChange={f.handleChange}
                              // ref={inputEl}
                            />
                          </Form.Group>
                          <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              // type="password"
                              name='password'
                              placeholder='password'
                              required
                              onChange={f.handleChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                              the username or password is incorrect
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button variant='primary' type='submit'>
                            Submit
                          </Button>
                        </Form>
                      </div>
                      <div className='card-footer p-4'>
                        <div className='text-center'>
                          <span>Нет аккаунта?</span>
                          <a href='/signup'>Регистрация</a>
                        </div>
                        <div className='text-center'>
                          <a href='/not_existing_path'>404 Page</a>
                        </div>
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
