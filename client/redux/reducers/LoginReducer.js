import * as AT from '../actions/ActionTypes';

export const UserType = Object.freeze({
  FAN: 'FAN',
  ARTIST: 'ARTIST',
});

const initialState = { authorized: false, userType: null };

const loginReducer = (state = initialState, action) => {
	console.log('loginReducer', action);
  switch (action.type) {
    case AT.LoginUser:
      return { ...state, authorized: true, };
    case AT.LoginArtist:
      return { ...state, authorized: true, userType: UserType.ARTIST };
    case AT.Logout:
      return { ...state, authorized: false, userType: null };

    case AT.GuestTypeFan:
      return { ...state, userType: UserType.FAN };

    case AT.GuestTypeArtist:
      return { ...state, userType: UserType.ARTIST };

    default: 
      return state;
  }
};

export default loginReducer;