import { createStore, applyMiddleware } from 'redux';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import RootReducer from './reducers/';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export default () => (
  createStore(RootReducer, applyMiddleware(middleware))
);