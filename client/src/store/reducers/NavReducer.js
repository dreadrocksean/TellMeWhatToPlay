import AppNavigation from "src/navigation/AppNavigation";

const navReducer = (state, action) => {
  // console.log('navReducer action', action);
  const newState = AppNavigation.router.getStateForAction(action, state);
  return newState || state;
};

export default navReducer;
