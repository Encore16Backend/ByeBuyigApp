import { add_orderlist } from "./types"

// 일반 상품을 넣을 reducer

const initState = {
    items : [],
}
const orderListReducer = (state=initState, action)=>{
    switch(action.type){
        case add_orderlist : 
            return{
                ...state,
                items: action.payload
            }
        
        default : return state
    }
}

export default orderListReducer