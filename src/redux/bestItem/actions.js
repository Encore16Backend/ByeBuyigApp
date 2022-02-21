import { add_best_items } from './types';


// action은 첫글자 소문자
export const addBestItems = (data)=>{
    return{
        type:add_best_items,
        payload:data
    }
}
