import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import init from './utils/initI18next.js';
import 'react-toastify/dist/ReactToastify.css';
// import initSockets from './utils/initSockets.js'


// import App from './components/App';
import store from './store/index.js';

// initSockets();
const vdom = init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {vdom}
  </Provider>
);
