// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "A8*******************",
  authDomain: "calendlio.firebaseapp.com",
  projectId: "calendlio",
  storageBucket: "calendlio.appspot.com",
  messagingSenderId: "**************",
  appId: "*********************",
  measurementId: "******************"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }; // Explicitly export the 'auth' object
