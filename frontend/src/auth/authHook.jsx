import { useContext } from 'react';

import authContext from './authContext.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
