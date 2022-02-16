import react from "react";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux'


const tokenFunc = (currentState, action)=>{
    if (currentState === undefined){
      return {isUndefined : true}
    }
    const newState = {...currentState}
    if (action.type === 'login'){ // action
        
    }
    return newState
}
const cookieToken = createStore(tokenFunc); // 로그인 성공시 받아올 토큰