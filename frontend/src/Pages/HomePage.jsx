import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Chat from '../components/Chat';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log('userId=', userId);
    if (!userId) {
      console.log('!userId - it works');
      navigate('/login');
    }
  });

  return (
    <Chat />
  );
}

export default HomePage;
