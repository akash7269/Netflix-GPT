// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYOLxR3k4764d2Q-7XcJ3n-pv3J-E2v40",
  authDomain: "netflixgpt-3d4fd.firebaseapp.com",
  projectId: "netflixgpt-3d4fd",
  storageBucket: "netflixgpt-3d4fd.firebasestorage.app",
  messagingSenderId: "950866136194",
  appId: "1:950866136194:web:4bdc5f4b54281916ccb89b",
  measurementId: "G-0L7D6FESR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();