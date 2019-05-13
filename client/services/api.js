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

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getDataFromRef = async ref => {
  const snap = await ref
    .get()
    .catch(err => Promise.resolve({ success: false, error: err }));
  const data = snap.data();
  return Promise.resolve({ success: true, data: { ...data, _id: ref.id } });
};

export const createDoc = async (type, req) => {
  const ref = await db
    .collection(`${type}s`)
    .add(req)
    .catch(err => {
      console.error(`Error adding ${type}: `, err);
      return Promise.resolve({ success: false, error: err });
    });
  console.log("Document written with ID: ", ref.id);
  return getDataFromRef(ref);
};

export const updateDoc = async (type, { _id, ...rest }) => {
  console.log("updateDoc payload: ", _id, rest);
  const ref = await db
    .collection(`${type}s`)
    .doc(_id)
    .update(rest)
    .catch(err => {
      console.error(`Error updating ${type}: `, err);
      return Promise.resolve({ success: false, error: err });
    });
  console.log(`${type} successfully updated: `, rest);
  return Promise.resolve({ success: true, data: { _id, ...rest } });
};

export const getDocs = async (type, req) => {
  const keys = Object.keys(req);
  const ref = await db
    .collection(`${type}s`)
    .where(keys[0], "==", req[keys[0]])
    .get()
    .catch(err => {
      console.error(`Error getting ${type}: `, err);
      return Promise.resolve({ success: false, error: err });
    });
  console.log(`${type} found!`);
  const doc = ref.docs[0];
  const data = doc ? { ...doc.data(), _id: doc.id } : null;
  const message = data ? "Found successfully" : "Not found";
  return Promise.resolve({ success: !!data, data, message });
};

export const getUser = async req => {
  const ref = await db
    .collection("users")
    .where("email", "==", req.email)
    .where("password", "==", req.password)
    // .select()
    .get()
    .catch(err => {
      console.error(`Error getting user: `, err);
      return Promise.reject({ error: err });
    });
  console.log(`User found!`);
  const user = ref.docs[0].data();
  return { ...user, _id: ref.docs[0].id };
  // return getDataFromRef(ref);
};

export const fetchSongs = () => {
  console.log("fetchSongs");
  // fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
  return fetch(`http://${getAPIUrl}/api/songs`)
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const fetchArtistSongs = artistId => {
  console.log("test", artistId);
  return fetch(`http://${getAPIUrl}/api/songs/artist/${artistId}`)
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
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

export const deleteDoc = async (type, id) => {
  await db
    .collection(`${type}s`)
    .doc(id)
    .delete()
    .catch(err => {
      console.error(`Error deleting ${type}: `, err);
      return Promise.resolve({ error: err, success: false });
    });
  return Promise.resolve({ success: true });
};

export const deleteSong = async id => {
  await db
    .collection("songs")
    .doc(id)
    .delete()
    .catch(err => {
      console.error("Error deleting song: ", err);
      return Promise.reject({ error: err, success: false });
    });
  return Promise.resolve({ success: true });

  // fetch(`http://${getAPIUrl}/api/song/` + id, {
  //   method: "DELETE"
  // })
  //   .then(res => res.json())
  //   .catch(err => console.error("Network Error"));
};

export const createSong = async req => {
  const songRef = await db
    .collection("songs")
    .add(req)
    .catch(err => {
      console.error("Error adding Song: ", err);
      return { error: err };
    });
  console.log("Document written with ID: ", songRef.id);
  return getDataFromRef(songRef);

  // console.log("createSong req", req);
  // return fetch(`http://${getAPIUrl}/api/songs`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(req)
  // })
  //   .then(res => res.json())
  //   .catch(err => console.error("Network Error"));
};

export const updateSong = req => {
  const id = req._id;
  delete req._id;
  return fetch(`http://${getAPIUrl}/api/song/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const voteSong = req => {
  console.log("voteSong req", req);
  const { _id, sentiment } = req;
  delete req._id;
  console.log("body", JSON.stringify(req));
  return fetch(`http://${getAPIUrl}/api/vote/song/${_id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const createArtist = async req => {
  const artistRef = await db
    .collection("artists")
    .add(req)
    .catch(err => {
      console.error("Error adding Artist: ", err);
      return { error: err };
    });
  console.log("Document written with ID: ", artistRef.id);
  return getDataFromRef(artistRef);

  // return fetch(`http://${getAPIUrl}/api/artist`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(req)
  // })
  //   .then(res => {
  //     console.log(res);
  //     return res.json();
  //   })
  //   .catch(err => console.error("Network Error"));
};

export const fetchArtists = () =>
  // fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
  fetch(`http://${getAPIUrl}/api/artists/`)
    .then(res => res.json())
    .catch(err => console.error("Network Error"));

export const fetchArtist = req => {
  const { artistId } = req;
  console.log("req artistId", artistId);
  return fetch(`http://${getAPIUrl}/api/artist/${artistId}`)
    .then(res => {
      // console.log('fetchArtist response', res);
      return res.json();
    })
    .catch(err => console.error("Network Error"));
};

export const fetchUserArtist = req => {
  const { userId } = req;
  console.log("req artistuserId", userId);
  return fetch(`http://${getAPIUrl}/api/artist/user/${userId}`)
    .then(res => {
      // console.log('fetchUserArtist response', res);
      return res.json();
    })
    .catch(err => console.error("Network Error"));
};

export const updateArtist = req => {
  console.log("api updateArtist", req);
  const id = req._id;
  delete req._id;
  return fetch(`http://${getAPIUrl}/api/artist/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const deleteArtist = id =>
  fetch(`http://${getAPIUrl}/api/artist/` + id, {
    method: "DELETE"
  })
    .then(res => res.json())
    .catch(err => console.error("Network Error"));

export const createUser = async req => {
  const userRef = await db
    .collection("users")
    .add(req)
    .catch(err => {
      console.error("Error adding User: ", err);
      return { error: err };
    });
  console.log("Document written with ID: ", userRef.id);
  return getDataFromRef(userRef);

  // return fetch(`http://${getAPIUrl}/api/users`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(req)
  // })
  //   .then(res => res.json())
  //   .catch(err => console.error("Network Error"));
};

export const fetchUsers = () =>
  fetch(`http://${getAPIUrl}/api/users`)
    .then(handleErrors)
    .then(res => res.json())
    .catch(err => console.error("Network Error"));

export const fetchUser = req => {
  const { email, password } = req;
  if (!email.trim() || !password.trim()) {
    throw Error("Both fields are required");
  }
  delete req.email;
  return fetch(`http://${getAPIUrl}/api/user/${email}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then(handleErrors)
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};

export const updateUser = req => {
  const id = req._id;
  delete req._id;
  return fetch(`http://${localIPs[0]}/api/user/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then(res => res.json())
    .catch(err => console.error("Network Error"));
};
