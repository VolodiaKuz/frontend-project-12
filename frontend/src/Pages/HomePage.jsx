import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import axios from 'axios';
import Chat from '../components/Chat';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (!userId) {
      navigate('/login');
    }
  });

  return (
    <Chat />
  );
};

export default HomePage;
