import { LogIn } from './types';
import { LogOut } from './types';
import {setPwd} from './types';


// action은 첫글자 소문자
export const logIn = (ID)=>{
    return{
        type:LogIn,
        payload:ID,
    }
}

export const Pwd = (pwd)=>{
    return{
        type:setPwd,
        payload:pwd,
    }
}


export const logOut = ()=>{
    return{
        type:LogOut
    }
}
