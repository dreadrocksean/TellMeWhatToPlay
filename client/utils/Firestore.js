import firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7KeJNbcyroHBp564KN8liPXMN1e_sTP4",
  authDomain: "tellmewhattoplay-1.firebaseapp.com",
  databaseURL: "https://tellmewhattoplay-1.firebaseio.com",
  projectId: "tellmewhattoplay-1",
  storageBucket: "tellmewhattoplay-1.appspot.com",
  messagingSenderId: "177859591611",
  appId: "1:177859591611:web:04d7a35bee4048d0"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
