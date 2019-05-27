import * as AT from "./ActionTypes";

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

const loginUser = user => ({
  type: AT.LoginUser,
  payload: user
});

const loginArtist = artist => {
  return {
    type: AT.LoginArtist,
    payload: artist
  };
};

const logout = () => ({
  type: AT.Logout
});

const loadingStatus = status => ({
  type: AT.Loading,
  payload: { loading: status }
});

const addMessage = msg => ({
  type: AT.Message,
  payload: { message: msg }
});

const loginError = payload => ({
  type: AT.LoginError,
  errorMessage: payload.errorMessage
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

const addArtistPhoto = imageURL => ({
  type: AT.addArtistPhoto,
  payload: imageURL
});

export {
  incrementVotes,
  decrementVotes,
  guestTypeFan,
  guestTypeArtist,
  loginUser,
  loginArtist,
  logout,
  loginError,
  register,
  registerSuccess,
  navigateToLogoutScreen,
  onAir,
  offAir,
  addArtistPhoto,
  loadingStatus,
  addMessage
};
