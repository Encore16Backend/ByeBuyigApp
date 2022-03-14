import { add_inquiry } from "./types"
import { add_inquiryTotalPage } from "./types"



export const addInquiry = (data)=>{
    return{
        type:add_inquiry,
        payload:data
    }
}
export const addInquiryPages = (data)=>{
    return{
        type:add_inquiryTotalPage,
        payload:data
    }
}
