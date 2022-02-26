import { add_best_cata_items } from "./types"


// action은 첫글자 소문자
export const addBestCataItems = (data)=>{
    return{
        type:add_best_cata_items,
        payload:data
    }
}
