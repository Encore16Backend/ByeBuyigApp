import { add_num } from "./types"


// action은 첫글자 소문자
export const addNum = (data)=>{
    return{
        type:add_num,
        payload:data
    }
}
