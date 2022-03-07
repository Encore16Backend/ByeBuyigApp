import { add_basket } from "./types"

// best상품을 넣을 reducer

const initState = {
    items : []
}
const basketReducer = (state=initState, action)=>{
    switch(action.type){
        case add_basket : 
            return{
                ...state,
                items : action.payload
            }
        default : return state
    }
}

export default basketReducer