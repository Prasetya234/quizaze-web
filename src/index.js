import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from "react-redux"
import reportWebVitals from './reportWebVitals';
import axios from "axios";

axios.interceptors.request.use(
  response => {
    return response;
  },
  function (error) {
    return Promise.reject(error)
  }
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
