import { add_star } from "./types"


// action은 첫글자 소문자
export const addStar = (data)=>{
    return{
        type:add_star,
        payload:data
    }
}
