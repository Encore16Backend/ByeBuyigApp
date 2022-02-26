import {add_cate_items} from "./types"
import { totalPage } from "./types"

// best상품을 넣을 reducer

const initState = {
    items : {},
    pages : 0
}
const cateItemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_cate_items :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                items : action.payload
            }
            case totalPage:
            return{
                ...state,
                pages : action.payload
            }
        
        default : return state
    }
}

export default cateItemReducer