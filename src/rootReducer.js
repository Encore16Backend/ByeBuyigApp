import { combineReducers } from "redux";
import userReducer from "./redux/user/reducer";
import itemReducer from "./redux/items/reducer";
import bestItemReducer from "./redux/bestItem/reducer";
import cateItemReducer from "./redux/CateItem/reducer";
import reviewReducer from "./redux/reviews/reducer";
import cataNumReducer from "./redux/cataNum/reducer";
import pageReducer from "./redux/pages/reducer";
import basketReducer from "./redux/basket/reducer";
import oneItemReducer from "./redux/oneItem/reducer";
import orderListReducer from "./redux/OrderItems/reducer";

const rootReducer = combineReducers({
    user:userReducer, // 유저정보
    Item : itemReducer, // 모든상품
    bestItem : bestItemReducer, // 모든베스트상품
    cateItem : cateItemReducer, // sidebar로 이동할떄 사용할 reducer
    reviews : reviewReducer, // 리뷰
    cataNum : cataNumReducer, // 검색과 cata 상품들 관련
    totalPage : pageReducer, // 페이지관련
    basket : basketReducer,
    oneItem : oneItemReducer,
    order:orderListReducer
})

export default rootReducer