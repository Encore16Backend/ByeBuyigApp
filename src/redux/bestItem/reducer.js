import { add_best_items } from "./types"
import { add_outer } from "./types"
import { add_top } from "./types"
import { add_pants } from "./types"

// best상품을 넣을 reducer

const initState = {
    items : {},
    top : {},
    pants : {},
    outer : {},
}
const bestItemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_best_items :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                items : action.payload
            }
        case add_top :
            return{
                ...state,
                top : action.payload
            }
        case add_outer :
            return{
                ...state,
                outer : action.payload
            }
        case add_pants :
            return{
                ...state,
                pants : action.payload
            }


        default : return state
    }
}

export default bestItemReducer