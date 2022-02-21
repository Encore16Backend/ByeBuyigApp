import { add_best_pants_items } from "./types"


// action은 첫글자 소문자
export const addBestPantsItems = (data)=>{
    return{
        type:add_best_pants_items,
        payload:data
    }
}
