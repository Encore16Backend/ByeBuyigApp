import {add_star} from "./types"

// best상품을 넣을 reducer

const initState = {
    star : {},
}
const cardItemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_star :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                items : action.payload
            }
        
        default : return state
    }
}

export default cardItemReducer