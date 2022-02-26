import { combineReducers } from "redux";
import userReducer from "./redux/user/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import itemReducer from "./redux/items/reducer";
import bestItemReducer from "./redux/bestItem/reducer";
import bestCataItemReducer from "./redux/bestcataItem/reducer";
import cateItemReducer from "./redux/CateItem/reducer";
import reviewReducer from "./redux/reviews/reducer";
import cataNumReducer from "./redux/cataNum/reducer";
import pageReducer from "./redux/pages/reducer";


const rootReducer = combineReducers({
    user:userReducer,
    Item : itemReducer, // 모든상품
    bestItem : bestItemReducer, // 모든베스트상품
    bestCataItem : bestCataItemReducer, // 안씀 삭제 예정
    cateItem : cateItemReducer, // sidebar로 이동할떄 사용할 reducer
    reviews : reviewReducer,
    cataNum : cataNumReducer,
    totalPage : pageReducer
})

export default rootReducer