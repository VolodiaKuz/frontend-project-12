/* eslint-disable react/jsx-no-constructed-context-values */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage.jsx';
import HomePage from '../Pages/HomePage';
import NotFoundPage from '../Pages/NotFoundPage';
import AuthContext from '../contexts/index.jsx';
import routes from '../utils/routes';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.mainPage()} element={<HomePage />} />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signUpPage()} element={<SignUpPage />} />
        <Route path={routes.page404()} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
