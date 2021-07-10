import firebase from "../utils/Firestore.js";
import { getLyrics, getSong } from 'genius-lyrics-api';
import { saveStorage, loadStorage } from "src/services/LocalStorage";
const db = firebase.firestore();
// db.settings({
//   timestampsInSnapshots: true
// });

const VOTEPERIOD_IN_MINS = 1;

const lastFMAPI = {
  API_KEY: "f99a0153aeb7a033fbece27dd9650248",
  SECRET: "8ae39b51a3e5d8afce2ca363edd6acbb",
  NAME: "dreadrocksean",
  EMAIL: "adrian@bartholomusic.com",
  ENDPOINT: "http://ws.audioscrobbler.com/2.0/?method="
};

const geniusLyrics = {
  CLIENT_ID: "geaU7Jx9SzLynU2ETvxJOnk8VlEjmTk-iaUMK1fP75YoZq1KlQoYVeq4b8Tmvv4n",
  CLIENT_SECRET: "jUPlQl4C3yGEjySt_swWbXx9xegVUOiH4xi3WC_CwjMXnUgkQ1GdVoBg-NWNwuaFj2V9muXJrs61O6v57YkhqQ",
  ACCESS_TOKEN: "oaj10VndbdQVKTBPDNvWXSt8VuauKG6W-mTpDeCvs_ZSEvI7LQBKqoa8zQnO5UVA",
}

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
    const message = `${type} ${data ? "successfully" : "not"} found!`;
    return Promise.resolve({ success: true, data, message });
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
  try {
    const res = await db
      .collection("artists")
      .doc(_id)
      .collection("geoData")
      .doc("location")
      .set(location);
    return Promise.resolve({ success: true, data: { _id, location } });
  } catch (err) {
    console.error(`Error updating location: `, err);
    return Promise.reject({ success: false, error: err });
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

const getMinsSecs = seconds => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return { mins, secs, seconds};
}

export const getTimesTillVotable = async now => {
  try {
    const localVotes = await loadStorage("votes");
    const timestamp = now ?? firebase.firestore.Timestamp.fromDate(new Date());
    const times = Object.keys(localVotes).reduce((acc, songId) => {
      const timeTillVotable = getMinsSecs(
        (VOTEPERIOD_IN_MINS * 60)
        - timestamp.seconds
        + localVotes[songId].timestamp.seconds
      );
      acc[songId] = {...localVotes[songId], timeTillVotable}
      return acc
    }, {});
    return Promise.resolve(times);
  } catch(err) {
    return Promise.resolve(null);
  }
}

export const updateVotes = async ({artist, songId, votes}) => {
  try {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const localVotes = await getTimesTillVotable(timestamp);
    const canVote = !localVotes?.[songId]
      || localVotes?.votes > votes
      || localVotes?.[songId].timeTillVotable.seconds <= 0;
    if (!canVote) {
      return Promise.resolve({ timeRemaining: localVotes.timeTillVotable });
    }

    const showSongRef = db.doc(`artists/${artist._id}/shows/${artist.currShowId}/songVotes/${songId}`);
    const payload = {votes, timestamp}
    await showSongRef.set(payload, {merge: true});
    const newLocalVotes = {...(localVotes || {}), [songId]: payload};
    saveStorage({votes: newLocalVotes})
    return Promise.resolve({timeRemaining: getMinsSecs(VOTEPERIOD_IN_MINS * 60)});
  } catch(err) {
    return Promise.reject(err)
  }
}

export const createShow = async artist => {
  const artistRef = db.doc(`artists/${artist._id}`);
  try {
    const timestamp =  firebase.firestore.Timestamp.fromDate(new Date());
    const showRes = await artistRef.collection('shows').add({startTime: timestamp});
    await artistRef.update({live: true, currShowId: showRes.id});
    return Promise.resolve(showRes.id)
  } catch(err) {
    return Promise.reject(err)
  }
}

export const endShow = async artist => {
  const artistRef = db.doc(`artists/${artist._id}`);
  const showRef = artistRef.collection("shows").doc(artist.currShowId);
  try {
    const timestamp =  firebase.firestore.Timestamp.fromDate(new Date());
    await showRef.update({endTime: timestamp});
    await artistRef.update({live: false, currShowId: null});
    return Promise.resolve(null)
  } catch(err) {
    return Promise.reject(err)
  }
}

export const fetchLastFMSong = (title, artist) => {
  const artistQuery = artist ? `&artist=${artist}` : "";
  return fetch(
    `${lastFMAPI.ENDPOINT}track.search&track=${title}${artistQuery}&api_key=${lastFMAPI.API_KEY}&format=json`
  )
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const fetchLyrics = async (title, artist) => {
  const options = {
    apiKey: geniusLyrics.ACCESS_TOKEN,
    title,
    artist,
    optimizeQuery: true
  };

  try {
    // const lyrics = await getLyrics(options);
    const {lyrics, albumArt} = await getSong(options);
    return Promise.resolve({lyrics, albumArt})
  } catch (err) {
    return Promise.reject(err);
  }
};