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
import { saveStorage, loadStorage } from "src/services/LocalStorage";

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

const loadStoredUserArtist = () => async (dispatch, getState) => {
  try {
    await loginStorageUser()(dispatch, getState);
    await loginStorageArtist()(dispatch, getState);
    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
};

const loginUser = credentials => async (dispatch, getState) => {
  try {
    const res = await getUser(credentials);
    dispatch({ type: AT.LoginUser, payload: res.data });
    await saveStorage({ user: res.data });
    res.message = "You Were Successfully Logged In";
    return Promise.resolve(res);
  } catch (err) {
    dispatch(logout());
    return Promise.reject(err);
  }
};

const loginStorageUser = () => async (dispatch, getState) => {
  console.log("LOGINSTORAGEUSER");
  try {
    const res = await loadStorage("user");
    if (!res || !res.data) throw "No user stored";
    dispatch({ type: AT.LoginUser, payload: res.data });
    return Promise.resolve(res);
  } catch (err) {
    dispatch(logout());
    return Promise.reject(err);
  }
};

const signupUser = payload => async (dispatch, getState) => {
  try {
    const res = await createUser(payload);
    dispatch({ type: AT.LoginUser, payload: res.data });
    await saveStorage({ user: res.data });
    res.message = "You Were Successfully Logged In";
    return Promise.resolve(res);
  } catch (err) {
    dispatch(logout());
    return Promise.reject(err);
  }
};

const loginArtist = userId => async (dispatch, getState) => {
  try {
    const res = await getDocs("artist", { userId });
    const artist = res && res.data;
    dispatch({ type: AT.LoginArtist, payload: artist });
    res.message = artist ? "Artist Successfully Logged In" : "Artist Not Found";
    await saveStorage({ artist });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const signUpArtist = payload => async (dispatch, getState) => {
  try {
    const res = await createArtist(payload);
    console.log("RES", res);
    dispatch({ type: AT.LoginArtist, payload: res.data });
    res.message = "Artist Successfully created";
    await saveStorage({ artist: res.data });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const loginStorageArtist = () => async (dispatch, getState) => {
  try {
    let artist = await loadStorage("artist");
    if (!artist || !artist.data) {
      console.log("DID NOT FIND ARTIST");
      const localUser = await loadStorage("user");
      if (!localUser || !localUser.data) {
        logout();
        throw new Error("Something weird occurred");
      }
      loginArtist(localUser.data._id)(dispatch, getState);
    } else dispatch({ type: AT.LoginArtist, payload: artist.data });
    return Promise.resolve(artist);
  } catch (err) {
    return Promise.reject(err);
  }
};

const logout = () => (dispatch, getState) => {
  saveStorage({ user: null, artist: null });
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
  loadStoredUserArtist,
  loginStorageUser,
  signupUser,
  loginArtist,
  loginStorageArtist,
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
