import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import axios from 'axios';
import Chat from '../components/Chat';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('JSON.parse(localStorage.getItem(\'userId\')) =======>', JSON.parse(localStorage.getItem('userId')));
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log('userId=', userId);
    if (!userId) {
      console.log('!userId in HomePage - it works');
      navigate('/login');
    }
  });

  return (
    <Chat />
  );
};

export default HomePage;
