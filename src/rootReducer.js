import { combineReducers } from "redux";
import userReducer from "./redux/user/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    user:userReducer
})

export default rootReducer