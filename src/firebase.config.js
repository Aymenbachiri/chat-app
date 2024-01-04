// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB08pr9ev1MubYbJwoSC_jCCAmFsxAmB14",
  authDomain: "chat-app-e8f6f.firebaseapp.com",
  projectId: "chat-app-e8f6f",
  storageBucket: "chat-app-e8f6f.appspot.com",
  messagingSenderId: "38714282889",
  appId: "1:38714282889:web:4979a2d91deb2796fec758",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
