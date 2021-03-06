import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { logIn } from './redux/user/actions';
import store from './store';
import {CookiesProvider} from 'react-cookie'
import { createPopper } from '@popperjs/core';
import { popperGenerator } from '@popperjs/core';



//  reload시에도 저장 가능하도록 index.js에 추가
if (sessionStorage.getItem('access_token')){
  const token = sessionStorage.getItem('access_token')
  const id = sessionStorage.getItem('id')
  store.dispatch(logIn(id))
  
}else{
  store.dispatch(logIn(''))
}

console.log("index")



ReactDOM.render(
  <CookiesProvider>
    <App />,
  </CookiesProvider>,
  document.getElementById('root')
);

reportWebVitals();
