import { add_best_outer_items } from "./types"


// action은 첫글자 소문자
export const addBestOuterItems = (data)=>{
    return{
        type:add_best_outer_items,
        payload:data
    }
}
