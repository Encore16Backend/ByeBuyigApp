import { totalPage } from "./types"
import { searchPage } from "./types"

// best상품을 넣을 reducer

const initState = {
    pages : 0,
    searchpages : 0
}
const pageReducer = (state=initState, action)=>{
    switch(action.type){
        case totalPage:
            return{
                ...state,
                pages : action.payload
            }
        case searchPage:
            return{
                ...state,
                searchpages:action.payload
            }
        default : return state
    }
}

export default pageReducer