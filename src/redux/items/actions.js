import { add_main_items } from './types';


// action은 첫글자 소문자
export const addMainItems = (data)=>{
    return{
        type:add_main_items,
        payload:data
    }
}
