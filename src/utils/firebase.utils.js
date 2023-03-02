import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjqYTqjZCT6KlwbLPx01NsmzLTEYWtjkk",
  authDomain: "crwn-clothing-db-20615.firebaseapp.com",
  projectId: "crwn-clothing-db-20615",
  storageBucket: "crwn-clothing-db-20615.appspot.com",
  messagingSenderId: "975786275902",
  appId: "1:975786275902:web:37240ee994074f6ce58d6f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// get a collectionRef (just like DocRef)
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // the location of the object we want to add to firebase
    const docRef = doc(collectionRef, object.title.toLowerCase());
    console.log(docRef);
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  // ref is like a reference to the collection
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  // snapshot is like a info card to locate the document
  const querySnapshot = await getDocs(q); //getDocs() allow to get multiple documents

  //querySnapshot.docs return an array of all snapshots
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data(); //get the actual data
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef, "userDocRef");

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists(), "userSnapShot");

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};

//this will return an auth object
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  console.log("signed in");
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged() returns an 'user' object. Refer the doc to this.
export const onAuthStateChangedListener = (
  callback,
  errorCallback,
  completeCallback
) => onAuthStateChanged(auth, callback, errorCallback, completeCallback);

/**
 * This is an observer. It creates a listener for us with 3 callbacks
 * next (callback): fired when it listens to the thing
 * error (errorCallback): fired when there's an error
 * complete (completeCallback): fired the stream is completed
 *
 * But here, we don't need the last two callbacks.
 */
