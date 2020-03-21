import { createStore, applyMiddleware } from "redux";
// import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import RootReducer from "./reducers/";

// const middleware = createReactNavigationReduxMiddleware(state => state.nav);

export default () => createStore(RootReducer);
// export default () => createStore(RootReducer, applyMiddleware(middleware));
