// import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
// import Navbar from '../components/Navbar';
import LogInForm from '../components/Forms/LogInForm';
import FormContainer from '../components/Forms/FormContainer';

const LoginPage = () => {
  const inputRef = useRef(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <FormContainer logInType>
      <LogInForm
        inputRef={inputRef}
        setAuthError={setAuthError}
        authError={authError}
      />
    </FormContainer>
  );
};

export default LoginPage;
