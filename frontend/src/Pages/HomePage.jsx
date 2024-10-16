import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function HomePage() {
  const navigate = useNavigate();
  // localStorage.clear();
  const tasks = useSelector((state) => state.tasksStore.tasks);
  console.log('tasks in HomePage', tasks);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log('userId=', userId);
    if (!userId) {
      console.log('!userId - it works');
      navigate('/login');
    }
  });

  return (
    <>
      <div className='h-100 bg-light'>
        <h1>Test route to Home Page '/'</h1>
      </div>
    </>
  );
}

export default HomePage;
