import {add_best_acc_items} from "./types"

// best상품을 넣을 reducer

const initState = {
    items : {},
}
const bestAccItemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_best_acc_items :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                items : action.payload
            }
        
        default : return state
    }
}

export default bestAccItemReducer