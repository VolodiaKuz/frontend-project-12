import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import loginPicture from '../assets/auth_logo.jpeg';

import LogInForm from '../components/Forms/LogInForm';
import PageContainer from '../components/PageContainer';
import LoginFooter from '../components/LoginFooter';

const LoginPage = () => {
  const inputRef = useRef(null);
  const [authError, setAuthError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <PageContainer>
      <div className="card-body row p-5">
        <div className="d-flex align-items-center justify-content-center col-12 col-md-6">
          <img
            src={loginPicture}
            className="rounded-circle"
            alt={t('login.submit')}
          />
        </div>
        <LogInForm
          inputRef={inputRef}
          setAuthError={setAuthError}
          authError={authError}
        />
      </div>
      <LoginFooter />
    </PageContainer>
  );
};

export default LoginPage;
