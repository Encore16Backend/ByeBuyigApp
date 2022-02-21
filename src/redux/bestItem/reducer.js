import { add_best_items } from "./types"

// best상품을 넣을 reducer

const initState = {
    items : {},
}
const bestItemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_best_items :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                items : action.payload
            }
        
        default : return state
    }
}

export default bestItemReducer