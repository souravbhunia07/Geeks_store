// import firebase from "firebase";
// import * as firebase from "firebase/app";
// import 'firebase/firestore';
// import firebase from "firebase/app";
// require("firebase/auth");
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaLQsauisbIGqwrfK27LJqbMedowia-FE",
    authDomain: "geeks-store-37b1f.firebaseapp.com",
    projectId: "geeks-store-37b1f",
    storageBucket: "geeks-store-37b1f.appspot.com",
    messagingSenderId: "24081024688",
    appId: "1:24081024688:web:87e20b0892d9178d349d75",
    measurementId: "G-NB4KYS90XF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };