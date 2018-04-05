import * as AT from './ActionTypes';

const incrementVotes = () => ({
  type: AT.IncrementVotes
});

const decrementVotes = () => ({
  type: AT.DecrementVotes
});

const guestTypeFan = () => ({
  type: AT.GuestTypeFan
});

const guestTypeArtist = () => ({
  type: AT.GuestTypeArtist
});

const loginUser = () => ({
  type: AT.LoginUser
});

const loginArtist = () => ({
  type: AT.LoginArtist
});

const logout = () => ({
  type: AT.Logout
});

const register = () => ({
  type: AT.Register
});

const registerSuccess = () => ({
  type: AT.RegisterSuccess
});

const navigateToLogoutScreen = () => ({
  type: AT.NavigateToLogoutScreen
});

const onAir = () => ({
  type: AT.OnAir
});

const offAir = () => ({
  type: AT.OffAir
});

export {
  incrementVotes,
  decrementVotes,
  guestTypeFan,
  guestTypeArtist,
  loginUser,
  loginArtist,
  logout,
  register,
  registerSuccess,
  navigateToLogoutScreen,
  onAir,
  offAir,
};
