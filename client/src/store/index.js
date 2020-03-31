import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RootReducer from "./reducers/";

export default () => createStore(RootReducer, applyMiddleware(thunk));
