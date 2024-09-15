import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTSHaTFhzR5yrapG9dNT4xowPkZsJfa_g",
  authDomain: "fresh-from-farmerzzz.firebaseapp.com",
  projectId: "fresh-from-farmerzzz",
  storageBucket: "fresh-from-farmerzzz.appspot.com",
  messagingSenderId: "792520875008",
  appId: "1:792520875008:web:8b4ebe196076b643a28ce5",
  measurementId: "G-82JM59ELQ4"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { db, auth };
