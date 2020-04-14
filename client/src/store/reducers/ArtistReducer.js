import * as AT from "src/store/actions/ActionTypes";

// const initialState = { live: false, imageURL: "" };
const initialState = null;

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.LoginArtist:
      return { ...state, ...action.payload };
    case AT.LogoutArtist: {
      console.log("LOGOUTARTIST");
      return null;
    }
    case AT.OnAir:
      return { ...state, live: true };
    case AT.OffAir:
      return { ...state, live: false };
    case AT.AddArtistPhoto:
      return { ...state, imageURL: action.payload };

    default:
      return state;
  }
};

export default artistReducer;
