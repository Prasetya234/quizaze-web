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
    <div className="dekstop">
      <App />
    </div>
    <div className="mobile">
      <div className="bgimg w3-display-container w3-animate-opacity w3-text-white">
        <div className="w3-display-topleft w3-padding-large w3-xlarge">
          Logo
        </div>
        <div className="w3-display-middle">
          <h1 className="w3-jumbo w3-animate-top">COMING SOON</h1>
          <hr className="w3-border-grey" style={{ margin: 'auto', width: '40%' }} />
          <p className="w3-large w3-center">35 days left</p>
        </div>
        <div className="w3-display-bottomleft w3-padding-large">
          Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
        </div>
      </div>

    </div>
  </Provider>,
);

reportWebVitals();
