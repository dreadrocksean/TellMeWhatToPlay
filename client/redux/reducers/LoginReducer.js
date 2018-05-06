import * as AT from '../actions/ActionTypes';
import { saveStorage } from '../../services/LocalStorage'

export const UserType = Object.freeze({
  FAN: 'FAN',
  ARTIST: 'ARTIST',
});

const initialState = { authorized: false, userType: null, user: null, artist: null };

const loginReducer = (state = initialState, action) => {
	// console.log('loginReducer', action);
  let tempState;
  switch (action.type) {
    case AT.LoginUser: {
      tempState = { ...state, authorized: true, user: action.payload};
      console.log('loginReducer LoginUser', tempState, action);
      return tempState;
    }
    case AT.LoginArtist:
      tempState = { ...state, artist: action.payload};
      // console.log('loginReducer LoginArtist', tempState);
      return tempState;
    case AT.Logout:
      tempState = { ...state, authorized: false, artist: null, user: null};
      // await saveStorage({user: tempState.user, artist: tempState.artist});
      return tempState;
    case AT.LoginError:
      return { ...state, authorized: false, errorMessage: action.payload.errorMessage };

    case AT.GuestTypeFan:
      return { ...state, userType: UserType.FAN, artist: null };

    case AT.GuestTypeArtist:
      return { ...state, userType: UserType.ARTIST };

    default:
      return state;
  }
};

export default loginReducer;