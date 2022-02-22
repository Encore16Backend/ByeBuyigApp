import { add_best_acc_items } from "./types"


// action은 첫글자 소문자
export const addBestAccItems = (data)=>{
    return{
        type:add_best_acc_items,
        payload:data
    }
}
