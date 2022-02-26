import { add_cate_items } from "./types"
import { totalPage } from "./types"


// action은 첫글자 소문자
export const addCateItems = (data)=>{
    return{
        type:add_cate_items,
        payload:data
    }
}
export const setTotalPage = (data)=>{
    return{
        type:totalPage,
        payload:data
    }
}
