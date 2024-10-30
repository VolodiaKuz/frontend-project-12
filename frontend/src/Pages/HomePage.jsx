import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chat from '../components/Chat';
import routes from '../utils/routes';
import useAuth from '../hooks/index.jsx';
import { addToken } from '../store/userSlice.js';

const HomePage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  console.log('test auth =>', auth.loggedIn);

  useEffect(() => {
    // const userId = JSON.parse(localStorage.getItem('userId'));
    // if (!userId) {
    //   navigate(routes.loginPagePath());
    // }
    if (!auth.loggedIn) {
      const userId = JSON.parse(localStorage.getItem('userId'));
      console.log('userId', userId);
      if (!userId) {
        navigate(routes.loginPagePath());
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
