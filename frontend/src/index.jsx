import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import init from './utils/init.jsx';
import store from './store/index.js';

const initApp = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      {vdom}
    </Provider>,
  );
};

initApp();
