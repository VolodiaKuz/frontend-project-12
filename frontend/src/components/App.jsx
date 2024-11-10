/* eslint-disable consistent-return */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage.jsx';
import HomePage from '../Pages/HomePage';
import NotFoundPage from '../Pages/NotFoundPage';
import routes from '../utils/routes';
import AuthProvider from '../auth/AuthProvider.jsx';

const PrivateRoute = ({ children }) => {
  const userSlice = useSelector((state) => state.userStore);
  if (!userSlice.isAuth) return <Navigate to="/login" />;
  return children;
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
