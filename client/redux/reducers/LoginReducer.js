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
      return { ...state, authorized: true, user: action.payload};
    }
    case AT.LoginArtist:
      // console.log('action.payload', action.payload);
      return { ...state, userType: UserType.ARTIST, artist: action.payload };
    case AT.Logout:
      return { ...state, authorized: false, userType: null };
    case AT.LoginError:
      return { ...state, authorized: false, userType: null, errorMessage: action.payload.errorMessage };

    case AT.GuestTypeFan:
      return { ...state, userType: UserType.FAN };

    case AT.GuestTypeArtist:
      return { ...state, userType: UserType.ARTIST };

    default: 
      return state;
  }
};

export default loginReducer;