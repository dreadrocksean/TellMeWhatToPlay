import * as AT from "src/store/actions/ActionTypes";

export const UserType = Object.freeze({
  FAN: "FAN",
  ARTIST: "ARTIST"
});

const initialState = {
  authorized: false,
  userType: null,
  user: null,
  artist: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.LoginUser:
      return {
        ...state,
        authorized: true,
        user: { ...state.user, ...action.payload }
      };
    case AT.LoginArtist:
      return { ...state, artist: { ...state.artist, ...action.payload } };
    case AT.Logout:
      return { ...state, authorized: false, artist: null, user: null };
    case AT.LoginError:
      return {
        ...state,
        authorized: false,
        errorMessage: action.payload.errorMessage
      };
    case AT.GuestTypeFan:
      return { ...state, userType: UserType.FAN };
    case AT.GuestTypeArtist:
      return { ...state, userType: UserType.ARTIST };
    default:
      return state;
  }
};

export default loginReducer;
