// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjwOuVWsujWKUOJoVxR2YX_oz4cEaguk",
  authDomain: "explore-email-password-a-bd665.firebaseapp.com",
  projectId: "explore-email-password-a-bd665",
  storageBucket: "explore-email-password-a-bd665.firebasestorage.app",
  messagingSenderId: "873060035675",
  appId: "1:873060035675:web:8ce4376108c5a2a939a37e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);