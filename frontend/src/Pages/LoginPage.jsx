import React, { useEffect, useRef, useState } from 'react';
import LogInForm from '../components/Forms/LogInForm';
import PageContainer from '../components/PageContainer';

const LoginPage = () => {
  const inputRef = useRef(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <PageContainer logInType>
      <LogInForm
        inputRef={inputRef}
        setAuthError={setAuthError}
        authError={authError}
      />
    </PageContainer>
  );
};

export default LoginPage;
