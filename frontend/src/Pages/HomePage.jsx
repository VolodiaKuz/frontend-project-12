import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Chat from '../components/Chat';
import routes from '../utils/routes';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (!userId) {
      navigate(routes.loginPagePath());
    }
  });

  return (
    <Chat />
  );
};

export default HomePage;
