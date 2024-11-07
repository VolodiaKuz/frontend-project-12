import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chat from '../components/Chat';
import routes from '../utils/routes';
import useAuth from '../auth/authHook.jsx';
import { addToken } from '../store/userSlice.js';

const HomePage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.loggedIn) {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (!userId) {
        navigate(routes.loginPage());
      } else {
        auth.logIn();
        const user = userId;
        dispatch(addToken({ user }));
      }
    }
  });

  return (
    <Chat />
  );
};

export default HomePage;
