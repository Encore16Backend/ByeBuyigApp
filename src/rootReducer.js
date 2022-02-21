import { combineReducers } from "redux";
import userReducer from "./redux/user/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import itemReducer from "./redux/items/reducer";
import bestItemReducer from "./redux/bestItem/reducer";
import bestCataItemReducer from "./redux/bestcataItem/reducer";
import bestAccItemReducer from "./redux/bestAccItem/reducer";
import bestTopItemReducer from "./redux/bestTopItem/reducer";
import bestPantsItemReducer from "./redux/bestPanteItem/reducer";
import bestOuterItemReducer from "./redux/bestOuterItem/reducer";
import cateItemReducer from "./redux/CateItem/reducer";



const rootReducer = combineReducers({
    user:userReducer,
    Item : itemReducer, // 모든상품
    bestItem : bestItemReducer, // 모든베스트상품
    bestCataItem : bestCataItemReducer, // 안씀 삭제 예정
    bestTopItem : bestTopItemReducer, // 상의 베스트
    bestPantsItem : bestPantsItemReducer, // 하의 베스트
    bestOuterItem : bestOuterItemReducer, // 아우터 베스트
    bestAccItem : bestAccItemReducer, // 악세사리 베스트
    cateItem : cateItemReducer // sidebar로 이동할떄 사용할 reducer
})

export default rootReducer