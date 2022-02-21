import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger"; // 미들웨어로 활용
import { composeWithDevTools } from "redux-devtools-extension";
import { logIn } from './redux/user/actions';
import thunk from "redux-thunk"; // action에서 dispatch를 리턴
import setAuthorizationToken from './utils/setAuthorizationToken';
import store from './store';
import axios from 'axios';
import GetMainItem from './hooks/GetMainItems';
import { addMainItems } from './redux/items/actions';


//  reload시에도 저장 가능하도록 index.js에 추가
if (localStorage.getItem('access_token')){
  const token = localStorage.getItem('access_token')
  const id = localStorage.getItem('id')
  console.log(id , ' index ')
  store.dispatch(logIn(id))
}else{
  store.dispatch(logIn(''))
  console.log('index 토큰없음')
}




ReactDOM.render(
    <App />,
  document.getElementById('root')
);

reportWebVitals();
