import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import initI18next from './utils/initI18next.js';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/index.js';

const init = async () => {
  const vdom = await initI18next();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      {vdom}
    </Provider>,
  );
};

init();
