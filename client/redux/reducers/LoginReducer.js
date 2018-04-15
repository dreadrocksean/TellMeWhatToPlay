import * as AT from '../actions/ActionTypes';

export const UserType = Object.freeze({
  FAN: 'FAN',
  ARTIST: 'ARTIST',
});

const initialState = { authorized: false, userType: null, user: null, artist: null };

const loginReducer = (state = initialState, action) => {
	console.log('loginReducer', action);
  switch (action.type) {
    case AT.LoginUser: {
      const newState = { ...state, authorized: true, user: action.payload};
      console.log('loginReducer LoginUser', newState);
      return newState;
    }
    case AT.LoginArtist:
      // console.log('action.payload', action.payload);
      return { ...state, userType: UserType.ARTIST, artist: action.payload };
    case AT.Logout:
      return { ...state, authorized: false };
    case AT.LoginError:
      return { ...state, authorized: false, errorMessage: action.payload.errorMessage };

    case AT.GuestTypeFan:
      return { ...state, userType: UserType.FAN };

    case AT.GuestTypeArtist:
    // console.log('GuestTypeArtist', action);
      return { ...state, userType: UserType.ARTIST };

    default: 
      return state;
  }
};

export default loginReducer;