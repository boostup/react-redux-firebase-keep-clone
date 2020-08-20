import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firestore } from "firebase";
import configFile from "./config";

// Initialize Firebase
firebase.initializeApp(configFile);
firebase.auth().onAuthStateChanged(function (u) {
  if (u) {
    user = u;
    isSignedIn = true;
  } else {
    user = null;
    isSignedIn = false;
  }
});
// initiate auth
export default firebase;
export const db = firebase.firestore();
export const config = configFile;

export let user = null;
export let isSignedIn = false;

export async function login() {
  try {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } catch (error) {
    console.error(error.message);
  }
}

export async function logout() {
  await firebase.auth().signOut();
}

export async function getNotesCollection() {
  if (!user)
    return async () => console.log("database waiting for logged user...");

  return db
    .collection(config.collectionName)
    .doc(user.uid)
    .collection("items")
    .orderBy("creationDate")
    .get()
    .then((data) => {
      let model = [];
      let i = 0;
      data.forEach((doc) => {
        model[i] = doc.data();
        i++;
      });
      return model;
    })
    .catch((err) => console.log("ERROR", err.message));
}

export async function updateNotesCollection(payload) {}
export async function updateNote(note) {
  console.log("NOTE", note);
  db.collection(config.collectionName)
    .doc(user.uid)
    .collection("items")
    .doc(note.id)
    .set({ ...note.data });
}
export async function deleteNote(id) {}

export async function createNote(payload) {
  console.log(firestore.Timestamp);
  db.collection(config.collectionName)
    .doc(user.uid)
    .collection("items")
    .add({ contents: "", creationDate: firebase.firestore.Timestamp.now() });
}
