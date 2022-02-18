import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setAuthorizationToken from './utils/setAuthorizationToken'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
axios.defaults.withCredentials = true // refreshToken에서 쿠키를 주고 받을 수 있음

setAuthorizationToken(localStorage.getItem('refresh_token'))
//  reload시에도 저장 가능하도록 index.js에 추가

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

reportWebVitals();
