import * as AT from "./ActionTypes";
import {
  createUser,
  createDoc,
  getDocs,
  getUser,
  fetchUser,
  createArtist,
  fetchUserArtist
} from "src/services/api";
import { saveStorage } from "src/services/LocalStorage";

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

const loginUser = credentials => async (dispatch, getState) => {
  try {
    const res = await getUser(credentials);
    dispatch({ type: AT.LoginUser, payload: res.data });
    saveStorage({ user: res.data });
    res.message = "You Were Successfully Logged In";
    // console.log("loginUserAC RES", res);
    return Promise.resolve(res);
  } catch (err) {
    dispatch(logout());
    return Promise.reject(err);
  }
};

const loginArtist = artist => ({
  type: AT.LoginArtist,
  payload: artist
});

// const logout = dispatch => ({ type: AT.Logout });

const logout = () => (dispatch, getState) => {
  saveStorage({ user: null });
  dispatch({ type: AT.Logout });
};

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

const AddArtistPhoto = imageURL => ({
  type: AT.AddArtistPhoto,
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
  AddArtistPhoto,
  loadingStatus,
  addMessage
};
