/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './app/store';
import reportWebVitals from './reportWebVitals';

axios.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error),
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
