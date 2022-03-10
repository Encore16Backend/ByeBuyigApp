import { add_one_items } from "./types"

// 일반 상품을 넣을 reducer

const initState = {
    item : [],
}
const oneItemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_one_items :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                item: action.payload
            }
        
        default : return state
    }
}

export default oneItemReducer