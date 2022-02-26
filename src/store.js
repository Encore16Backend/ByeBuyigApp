
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [logger,thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store