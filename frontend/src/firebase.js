// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBNR0HUhUf4WNh1p7vJ6sua9qyFqhCOXk",
  authDomain: "calendlio.firebaseapp.com",
  projectId: "calendlio",
  storageBucket: "calendlio.appspot.com",
  messagingSenderId: "1004749557336",
  appId: "1:1004749557336:web:7c67ca0791fe94ba9cc42d",
  measurementId: "G-VSW0NQ175G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }; // Explicitly export the 'auth' object
