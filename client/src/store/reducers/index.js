import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import ArtistReducer from "./ArtistReducer";
import AppReducer from "./AppReducer";
import SongReducer from "./SongReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  artist: ArtistReducer,
  app: AppReducer,
  song: SongReducer
});

export default rootReducer;
