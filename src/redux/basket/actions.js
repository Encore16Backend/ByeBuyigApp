import { add_basket } from "./types"


// action은 첫글자 소문자
export const addBasket = (data)=>{
    return{
        type:add_basket,
        payload:data
    }
}
