import axios from 'axios';
import { LogIn } from './types';
import { LogOut } from './types';


// action은 첫글자 소문자
export const logIn = (ID)=>{
    return{
        type:LogIn,
        payload:ID
    }
}

export const logOut = ()=>{
    return{
        type:LogOut
    }
}
