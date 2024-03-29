/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './app/store';
import reportWebVitals from './reportWebVitals';
import Mobile from './Mobile';

axios.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error),
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div className="dekstop">
      <App />
    </div>
    <div className="mobile">
      <Mobile />
    </div>
  </Provider>,
);

reportWebVitals();
