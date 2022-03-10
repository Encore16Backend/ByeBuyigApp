import { add_orderlist } from './types';


// action은 첫글자 소문자
export const addOrderList = (data)=>{
    return{
        type:add_orderlist,
        payload:data
    }
}
