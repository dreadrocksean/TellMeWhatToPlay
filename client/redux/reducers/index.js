import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import NavReducer from './NavReducer';
import ArtistReducer from './ArtistReducer';

const rootReducer = combineReducers({
  nav: NavReducer, login: LoginReducer,
  artist: ArtistReducer,
});

export default rootReducer;