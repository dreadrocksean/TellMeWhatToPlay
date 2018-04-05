
import AppNavigation from '../../navigation/AppNavigation';

const navReducer = (state, action) => {
  // console.log('action', action);
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
};

export default navReducer;
