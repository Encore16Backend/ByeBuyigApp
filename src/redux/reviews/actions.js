import { add_review } from "./types"


// action은 첫글자 소문자
export const addReview = (data)=>{
    return{
        type:add_review,
        payload:data
    }
}
