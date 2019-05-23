import * as AT from "../actions/ActionTypes";

const initialState = { live: false, imageURL: "" };

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.LoginArtist:
      return { ...state, ...action.payload };
    case AT.OnAir:
      return { ...state, live: true };
    case AT.OffAir:
      return { ...state, live: false };
    case AT.addArtistPhoto:
      console.log("addArtistPhoto", action);
      return { ...state, imageURL: action.payload };

    default:
      return state;
  }
};

export default artistReducer;
