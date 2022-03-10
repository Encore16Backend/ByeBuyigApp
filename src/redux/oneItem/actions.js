import { add_one_items } from './types';


// action은 첫글자 소문자
export const addOneItems = (data)=>{
    return{
        type:add_one_items,
        payload:data
    }
}
