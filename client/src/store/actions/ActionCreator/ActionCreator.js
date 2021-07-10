import firebase from "src/utils/Firestore";

import * as AT from "src/store/actions/ActionTypes";
import {
  createUser,
  createDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getUser,
  fetchUser,
  fetchUserArtist
} from "src/services/api";
import { saveStorage, loadStorage } from "src/services/LocalStorage";


const db = firebase.firestore();


export const incrementVotes = () => ({
  type: AT.IncrementVotes
});

export const decrementVotes = () => ({
  type: AT.DecrementVotes
});

export const guestTypeFan = () => ({
  type: AT.GuestTypeFan
});

export const guestTypeArtist = () => ({
  type: AT.GuestTypeArtist
});

export const guestTypeNone = () => ({
  type: AT.GuestTypeNone
});

// export const openModal = () => ({
//   type: AT.OpenModal
// });
//
// export const closeModal = () => ({
//   type: AT.CloseModal
// });

export const setModalContent = content => ({
  type: AT.SetModalContent,
  payload: { content }
});

export const setModalHeight = height => ({
  type: AT.SetModalHeight,
  payload: { height }
});

export const hideModalCloseButton = hide => ({
  type: AT.HideModalCloseButton,
  payload: { hideCloseButton }
});

export const loadStoredUserArtist = () => async (dispatch, getState) => {
  try {
    await loginStorageUser()(dispatch, getState);
    await loginStorageArtist()(dispatch, getState);
    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginUser = credentials => async (dispatch, getState) => {
  try {
    const res = await getUser(credentials);
    dispatch({ type: AT.LoginUser, payload: res.data });
    await saveStorage({ user: res.data });
    res.message = "You Were Successfully Logged In";
    console.log("User Status: ", res);
    return Promise.resolve(res);
  } catch (err) {
    dispatch(logout());
    return Promise.reject(err);
  }
};

export const loginStorageUser = () => async (dispatch, getState) => {
  try {
    const res = await loadStorage("user");
    if (!res) throw "No user stored";
    return Promise.resolve(res);
  } catch (err) {
    dispatch(logout());
    return Promise.reject(err);
  }
};

export const signupUser = payload => async (dispatch, getState) => {
  try {
    const found = await getDocs("user", { email: payload.email });
    if (found.data) throw new Error("User already exists.");
    const res = await createUser(payload);
    dispatch({ type: AT.LoginUser, payload: res.data });
    dispatch({ type: AT.LogoutArtist });
    await saveStorage({ user: res.data, artist: null });
    res.message = "You Were Successfully Logged In";
    return Promise.resolve(res);
  } catch (err) {
    console.log("ERR", err);
    dispatch(logout());
    return Promise.reject(err);
  }
};

export const addLyrics = ({ _id, lyrics, image }) => async () => {
  if (!_id) return;
  try {
    const res = await updateDoc("song", { _id, lyrics, image });
    const song = res && res.data;
    res.message = song ? "Lyrics successfully added" : "Problem Adding Lyrics";
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const newArtist = data => async (dispatch, getState) => {
  if (data._id) {
    return updateArtist(data)(dispatch, getState);
  }
  delete data._id;
  try {
    const res = await createDoc("artist", data);
    const artist = res && res.data;
    dispatch({ type: AT.LoginArtist, payload: artist });
    res.message = artist
      ? "Artist Successfully Logged In"
      : "Problem Creating Artist";
    await saveStorage({ artist });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateArtist = data => async (dispatch, getState) => {
  try {
    const res = await updateDoc("artist", data);
    const artist = res && res.data;
    dispatch({ type: AT.LoginArtist, payload: artist });
    res.message = artist
      ? "Artist Successfully Logged In"
      : "Problem Creating Artist";
    await saveStorage({ artist });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginArtist = userId => async (dispatch, getState) => {
  try {
    const res = await getDocs("artist", { userId });
    // console.log("Artist Logged In", userId, res);
    const artist = res && res.data;
    dispatch({ type: AT.LoginArtist, payload: artist });
    res.message = artist ? "Artist Successfully Logged In" : "Artist Not Found";
    await saveStorage({ artist });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteArtist = artistId => async (dispatch, getState) => {
  // console.log("DELETEARTIST", deleteArtist);
  try {
    const res = await deleteDoc("artist", artistId);
    const artist = res && res.data;
    dispatch({ type: AT.LogoutArtist });
    res.message = artist
      ? "Artist Successfully Logged Out"
      : "Artist Not Found";
    await saveStorage({ artist: null });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const signUpArtist = payload => async (dispatch, getState) => {
  try {
    const res = await createArtist(payload);
    // console.log("RES", res);
    dispatch({ type: AT.LoginArtist, payload: res.data });
    res.message = "Artist Successfully created";
    await saveStorage({ artist: res.data });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginStorageArtist = () => async (dispatch, getState) => {
  try {
    let artist = await loadStorage("artist");
    if (!artist) {
      console.log("DID NOT FIND ARTIST");
      const localUser = await loadStorage("user");
      if (!localUser?.data) logout();
      loginArtist(localUser.data._id)(dispatch, getState);
    } else dispatch({ type: AT.LoginArtist, payload: artist.data });
    return Promise.resolve(artist);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logout = () => dispatch => {
  saveStorage({ user: null, artist: null });
  dispatch({ type: AT.Logout });
};

export const loadingStatus = status => ({
  type: AT.Loading,
  payload: { loading: status }
});

export const addMessage = msg => ({
  type: AT.Message,
  payload: { message: msg }
});

export const loginError = payload => ({
  type: AT.LoginError,
  errorMessage: payload.errorMessage
});

export const register = () => ({
  type: AT.Register
});

export const registerSuccess = () => ({
  type: AT.RegisterSuccess
});

export const navigateToLogoutScreen = () => ({
  type: AT.NavigateToLogoutScreen
});

export const onAir = payload => ({
  type: AT.OnAir,
  payload
});

export const offAir = () => ({
  type: AT.OffAir
});

export const updateCurrSong = song => ({
  type: AT.CurrSong,
  payload: { song }
});

export const AddArtistPhoto = imageURL => ({
  type: AT.AddArtistPhoto,
  payload: imageURL
});
