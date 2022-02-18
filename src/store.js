import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger"; // 미들웨어로 활용
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // action에서 dispatch를 리턴

const middleware = [logger,thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;