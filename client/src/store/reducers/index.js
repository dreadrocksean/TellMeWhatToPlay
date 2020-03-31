import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import ArtistReducer from "./ArtistReducer";
import AppReducer from "./AppReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  artist: ArtistReducer,
  app: AppReducer
});

export default rootReducer;
