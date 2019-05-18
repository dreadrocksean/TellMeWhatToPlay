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
  try {
    const ref = await db.collection(`${type}s`).add(req);
    console.log("Document written with ID: ", ref.id);
    return getDataFromRef(ref);
  } catch (err) {
    console.error(`Error adding ${type}: `, err);
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
    console.log(`${type} found!`);
    const doc = ref.docs[0];
    const data = doc ? { ...doc.data(), _id: doc.id } : null;
    const message = data ? "Found successfully" : "Not found";
    return Promise.resolve({ success: !!data, data, message });
  } catch (err) {
    console.error(`Error getting ${type}: `, err);
    return Promise.resolve({ success: false, error: err });
  }
};

export const fetchUserArtist = req => {
  const { userId } = req;
  console.log("req artistuserId", userId);
  return fetch(`http://${getAPIUrl}/api/artist/user/${userId}`)
    .then(res => {
      return res.json();
    })
    .catch(err => console.error("Network Error"));
};

export const updateDoc = async (type, { _id, ...rest }) => {
  console.log("updateDoc payload: ", _id, rest);

  try {
    const ref = await db
      .collection(`${type}s`)
      .doc(_id)
      .update(rest);
    console.log(`${type} successfully updated: `, rest);
    return Promise.resolve({ success: true, data: { _id, ...rest } });
  } catch (err) {
    console.error(`Error updating ${type}: `, err);
    return Promise.resolve({ success: false, error: err });
  }
};

export const deleteDoc = async (type, id) => {
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
    const data = doc ? { ...doc.data(), _id: doc.id } : null;
    const message = data ? "Found successfully" : "Not found";
    console.log(message);
    return Promise.resolve({ success: !!data, data, message });
  } catch (err) {
    console.error(`Error getting ${type}: `, err);
    return Promise.resolve({ success: false, error: err });
  }
};

export const fetchLastFMSong = (title, artist) => {
  const artistQuery = artist ? `&artist=${artist}` : "";
  return fetch(
    `${lastFMAPI.ENDPOINT}track.search&track=${title}${artistQuery}&api_key=${
      lastFMAPI.API_KEY
    }&format=json`
  )
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const fetchLyrics = (title, artist) => {
  return fetch(
    `${apiSeeds.ENDPOINT}/${artist}/${title}?apikey=${apiSeeds.API_KEY}`
  )
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};
