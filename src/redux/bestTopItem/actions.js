import { add_best_top_items } from "./types"


// action은 첫글자 소문자
export const addBestTopItems = (data)=>{
    return{
        type:add_best_top_items,
        payload:data
    }
}
