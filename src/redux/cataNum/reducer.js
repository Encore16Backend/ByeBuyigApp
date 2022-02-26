import {add_num} from "./types"

const initState = {
    items : [],
}
const cataNumReducer = (state=initState, action)=>{
    switch(action.type){
        case add_num : 
            return{
                ...state,
                items : action.payload
            }
        
        default : return state
    }
}

export default cataNumReducer