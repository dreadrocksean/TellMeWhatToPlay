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
  // console.log('loginReducer', action);
  let tempState;
  switch (action.type) {
    case AT.LoginUser:
      tempState = {
        ...state,
        authorized: true,
        user: { ...state.user, ...action.payload }
      };
      console.log("loginReducer", action, tempState);
      return tempState;
    case AT.LoginArtist:
      tempState = { ...state, artist: { ...state.artist, ...action.payload } };
      //
      // console.log('loginReducer LoginArtist', tempState);
      return tempState;
    case AT.Logout:
      tempState = { ...state, authorized: false, artist: null, user: null };
      // await saveStorage({ user: tempState.user, artist: tempState.artist });
      console.log("reducer logout", action, tempState);
      return tempState;
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
