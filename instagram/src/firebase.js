import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBh0S4iuZ2mhXtJFUeJkxYFUybn67HgpZY",
  authDomain: "instagram-clone-2961d.firebaseapp.com",
  databaseURL: "https://instagram-clone-2961d.firebaseio.com",
  projectId: "instagram-clone-2961d",
  storageBucket: "instagram-clone-2961d.appspot.com",
  messagingSenderId: "811254644544",
  appId: "1:811254644544:web:271f901428e1428ddc84a5",
  measurementId: "G-434PWN7RXB",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
