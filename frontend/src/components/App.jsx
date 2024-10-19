import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import HomePage from '../Pages/HomePage';
import NotFoundPage from '../Pages/NotFoundPage';
import initSockets from '../utils/initSockets.js'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  initSockets(dispatch);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
