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

const middleware = [logger,thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

//  reload시에도 저장 가능하도록 index.js에 추가
if (localStorage.getItem('access_token')){
  const token = localStorage.getItem('access_token')
  const id = localStorage.getItem('id')
  console.log(id , ' index')
  store.dispatch(logIn(id))
  setAuthorizationToken(token)
}else{
  localStorage.removeItem('id')
  store.dispatch(logIn(''))
}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

reportWebVitals();
