import firebase from "../utils/Firestore.js";
const db = firebase.firestore();
// db.settings({
//   timestampsInSnapshots: true
// });

const lastFMAPI = {
  API_KEY: "f99a0153aeb7a033fbece27dd9650248",
  SECRET: "8ae39b51a3e5d8afce2ca363edd6acbb",
  NAME: "dreadrocksean",
  EMAIL: "adrian@bartholomusic.com",
  ENDPOINT: "http://ws.audioscrobbler.com/2.0/?method="
};

const apiSeeds = {
  API_KEY: "WMgEiPpFQsYZWtep0Lyylax0Ncc1CByguiDFCKi7otLaKo4k9RzViN8zHVGspmyj",
  ENDPOINT: "https://orion.apiseeds.com/api/music/lyric"
};

const getAPIUrl = (() => {
  const localIPs = [
    "localhost",
    "136.63.53.150",
    // '172.20.10.3', // (hotspot)
    // '192.168.1.238', // (Grinders)
    // '192.168.0.65', // (Grinders)
    "192.168.1.250",
    "10.128.1.56"
  ];
  // return 'https://roadiethreeeightapi.azurewebsites.net';
  return `${localIPs[0]}:4000`;
})();

export const getDataFromRef = async ref => {
  try {
    const snap = await ref.get();
    const data = snap.data();
    return Promise.resolve({ success: true, data: { ...data, _id: ref.id } });
  } catch (err) {
    Promise.resolve({ success: false, error: err });
  }
};

export const createDoc = async (type, req) => {
  console.log("CREATEDOC", type, req);
  try {
    const ref = await db.collection(`${type}s`).add(req);
    return Promise.resolve(getDataFromRef(ref));
  } catch (err) {
    console.error(`Error adding ${type}: `, err);
    return Promise.reject({ success: false, error: err });
  }
};

export const createUser = async req => {
  try {
    const data = await createDoc("user", req);
    return Promise.resolve(data);
  } catch (err) {
    console.error(`Error adding User: `, err);
    return Promise.resolve({ success: false, error: err });
  }
};

export const getDocs = async (type, req) => {
  const keys = Object.keys(req);
  try {
    const ref = await db
      .collection(`${type}s`)
      .where(keys[0], "==", req[keys[0]])
      .get();
    const doc = ref.docs[0];
    const data = doc ? { ...doc.data(), _id: doc.id } : null;
    const message = `${type} successfully found!`;
    return Promise.resolve({ success: !!data, data, message });
  } catch (err) {
    console.error(`Error getting ${type}: `, err);
    return Promise.resolve({ success: false, error: err });
  }
};

export const fetchUserArtist = req =>
  fetch(`http://${getAPIUrl}/api/artist/user/${req.userId}`)
    .then(res => res.json())
    .catch(err => console.error("Error fetching User Artist: ", err));

export const updateDoc = async (type, { _id, ...rest }) => {
  console.log("UPDATEDOC", updateDoc);
  try {
    const res = await db
      .collection(`${type}s`)
      .doc(_id)
      .update(rest);
    return Promise.resolve({ success: true, data: { _id, ...rest } });
  } catch (err) {
    console.error(`Error updating ${type}: `, err);
    return Promise.reject({ success: false, error: err });
  }
};

export const updateLocation = async ({ _id, location }) => {
  console.log("UPDATELOCATION");
  try {
    const res = await db
      .collection("artists")
      .doc(_id)
      .collection("geoData")
      .doc("location")
      .update(location);
    return Promise.resolve({ success: true, data: { _id, location } });
  } catch (err) {
    console.error(`Error updating location: `, err);
    return Promise.reject({ success: false, error: err });
  }
};

export const deleteDoc = async (type, id) => {
  console.log("TYPE, ID", type, id);
  try {
    await db
      .collection(`${type}s`)
      .doc(id)
      .delete();
    return Promise.resolve({ success: true });
  } catch (err) {
    console.error(`Error deleting ${type}: `, err);
    return Promise.resolve({ error: err, success: false });
  }
};

export const getUser = async req => {
  try {
    const ref = await db
      .collection("users")
      .where("email", "==", req.email)
      .where("password", "==", req.password)
      .get();
    const doc = ref.docs[0];
    if (!doc) throw new Error("Doc doesnt exist");
    const user = { ...doc.data(), _id: doc.id };
    return Promise.resolve({
      success: !!user,
      data: user,
      message: "User found successfully",
      error: null
    });
  } catch (err) {
    const errorMessage = `Error getting User`;
    // console.error(errorMessage);
    return Promise.reject({
      success: false,
      error: err,
      message: errorMessage
    });
  }
};

export const fetchLastFMSong = (title, artist) => {
  const artistQuery = artist ? `&artist=${artist}` : "";
  return fetch(
    `${lastFMAPI.ENDPOINT}track.search&track=${title}${artistQuery}&api_key=${lastFMAPI.API_KEY}&format=json`
  )
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const fetchLyrics = (title, artist) =>
  fetch(`${apiSeeds.ENDPOINT}/${artist}/${title}?apikey=${apiSeeds.API_KEY}`)
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
