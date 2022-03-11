import { add_location1 } from "./types"
import { add_location2 } from "./types"
import { add_location3 } from "./types"

// best상품을 넣을 reducer

const initState = {
    loc1 : [],
    loc2 : [],
    loc3 : []
}
const locReducer = (state=initState, action)=>{
    switch(action.type){
        case add_location1 : 
            return{
                ...state,
                loc1 : action.payload
            }
        case add_location2 : 
        return{
            ...state,
            loc2 : action.payload
        }
        case add_location3 : 
        return{
            ...state,
            loc3 : action.payload
        }
        default : return state
    }
}

export default locReducer