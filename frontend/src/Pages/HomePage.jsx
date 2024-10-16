import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
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
    axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${userId.token}`,
      },
    }).then((response) => {
      console.log('response.data in HomePage axios.get(/api/v1/channels) ==',response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
    });
  });

  return (
    <Chat />
  );
}

export default HomePage;
