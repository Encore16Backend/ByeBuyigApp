import {add_review} from "./types"

// best상품을 넣을 reducer

const initState = {
    reviews : [],
}
const reviewReducer = (state=initState, action)=>{
    switch(action.type){
        case add_review :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                reviews : action.payload
            }
        default : return state
    }
}

export default reviewReducer