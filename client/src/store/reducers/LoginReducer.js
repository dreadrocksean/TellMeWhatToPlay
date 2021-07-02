import * as AT from "src/store/actions/ActionTypes";
import { saveStorage, loadStorage } from "src/services/LocalStorage";

export const UserType = Object.freeze({
  FAN: "FAN",
  ARTIST: "ARTIST"
});

const initialState = {
  authorized: false,
  userType: null,
  user: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.LoginUser:
      console.log("TCL: loginReducer -> action", action)
      return {
        ...state,
        authorized: true,
        user: { ...state.user, ...action.payload }
      };
    case AT.Logout:
      logout();
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
    case AT.GuestTypeNone:
      return { ...state, userType: null };
    default:
      return state;
  }
};

const logout = () => {
  saveStorage({ user: null, artist: null });
};

export default loginReducer;
