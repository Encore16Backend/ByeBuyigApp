import { add_main_items } from "./types"

// 일반 상품을 넣을 reducer

const initState = {
    items : [],
    categories: [],
    count: 0,
    description: "",
    images: [], // 여러 값들이 옴
    itemid: 0,
    itemname: "",
    price: 0,
    purchasecnt: 0,
    reviewmean: 0,
}
const itemReducer = (state=initState, action)=>{
    switch(action.type){
        case add_main_items :  // 아이템의 전체 배열을 받는 action
            return{
                ...state,
                items : action.payload
            }
        
        default : return state
    }
}

export default itemReducer