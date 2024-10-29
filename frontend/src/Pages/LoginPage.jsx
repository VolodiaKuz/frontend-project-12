import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import LogInForm from '../components/Forms/LogInForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

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
                      <LogInForm
                        inputRef={inputRef}
                        setAuthError={setAuthError}
                        authError={authError}
                      />
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
