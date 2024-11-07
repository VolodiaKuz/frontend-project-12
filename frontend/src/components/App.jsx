/* eslint-disable consistent-return */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import useAuth from '../auth/authHook.jsx';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage.jsx';
import HomePage from '../Pages/HomePage';
import NotFoundPage from '../Pages/NotFoundPage';
import routes from '../utils/routes';
import AuthProvider from '../auth/AuthProvider.jsx';
import { addToken } from '../store/userSlice.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.loggedIn) {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (!userId) {
        return <Navigate to="/login" />;
      }
      auth.logIn();
      const user = userId;
      dispatch(addToken({ user }));
    }
  });

  return children;
  // return (
  //   auth.loggedIn ? children : <Navigate to="/login" />
  // );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.mainPage()}
          element={(
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signUpPage()} element={<SignUpPage />} />
        <Route path={routes.page404()} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
