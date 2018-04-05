import { NavigationActions } from 'react-navigation';
import * as AT from '../actions/ActionTypes';

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams('login');
const ActionForLoggedInUser = AppNavigator.router.getActionForPathAndParams('screen1');
const ActionForLoggedInArtist = AppNavigator.router.getActionForPathAndParams('screen1');
const ActionForGuestArtist = AppNavigator.router.getActionForPathAndParams('screen1');
const ActionForGuestFan = AppNavigator.router.getActionForPathAndParams('screen1');

const stateForLoggedOut = AppNavigator.router.getStateForAction(ActionForLoggedOut);
const stateForLoggedInUser = AppNavigator.router.getStateForAction(ActionForLoggedInUser);
const stateForLoggedInArtist = AppNavigator.router.getStateForAction(ActionForLoggedInArtist);
const stateForGuestUser = AppNavigator.router.getStateForAction(ActionForGuestUser);
const stateForGuestArtist = AppNavigator.router.getStateForAction(ActionForGuestArtist);

const initialState = {
	stateForLoggedOut, stateForLoggedInUser, stateForLoggedInArtist, stateForGuestFan, stateForGuestArtist,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case AT.GuestTypeArtist:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case AT.GuestTypeFan:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case AT.LoginUser:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case AT.LoginArtist:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case AT.Logout:
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'login' })]
          })
        )
      };

    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(action,state.stateForLoggedIn)
      };
  }
};

export default navigationReducer;