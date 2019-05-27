import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import NavReducer from "./NavReducer";
import ArtistReducer from "./ArtistReducer";
import AppReducer from "./AppReducer";

const rootReducer = combineReducers({
  nav: NavReducer,
  login: LoginReducer,
  artist: ArtistReducer,
  app: AppReducer
});

export default rootReducer;
