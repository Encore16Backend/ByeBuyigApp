import {add_inquiry} from "./types"
import { add_inquiryTotalPage } from "./types"

// best상품을 넣을 reducer

const initState = {
    inquirys : [],
    pages : 0
}
const inquiryReducer = (state=initState, action)=>{
    switch(action.type){
        case add_inquiry :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                inquirys : action.payload
            }
        case add_inquiryTotalPage:
            return{
                ...state,
                pages:action.payload
            }
        default : return state
    }
}

export default inquiryReducer