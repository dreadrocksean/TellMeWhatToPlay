import * as AT from '../actions/ActionTypes';

export const UserType = Object.freeze({
  FAN: 'FAN',
  ARTIST: 'ARTIST',
});

const initialState = { authorized: false, userType: null, user: null, artist: null };

const loginReducer = (state = initialState, action) => {
	// console.log('loginReducer', action);
  switch (action.type) {
    case AT.LoginUser: {
      const newState = { ...state, authorized: true, user: action.payload};
      // console.log('loginReducer LoginUser', newState, action);
      return newState;
    }
    case AT.LoginArtist:
      let newState = { ...state, artist: action.payload};
      // console.log('loginReducer LoginArtist', newState);
      return newState;
    case AT.Logout:
      return { ...state, authorized: false };
    case AT.LoginError:
      return { ...state, authorized: false, errorMessage: action.payload.errorMessage };

    case AT.GuestTypeFan:
      return { ...state, userType: UserType.FAN };

    case AT.GuestTypeArtist:
      newState = { ...state, userType: UserType.ARTIST };
      console.log('loginReducer GuestTypeArtist', newState);
      return newState;

    default:
      return state;
  }
};

export default loginReducer;