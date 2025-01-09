// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT8TcqSqbcUYK-DcC3_JGSVGom0gkh-_s",
  authDomain: "skmetal-898ad.firebaseapp.com",
  projectId: "skmetal-898ad",
  storageBucket: "skmetal-898ad.appspot.com",
  messagingSenderId: "459050453407",
  appId: "1:459050453407:web:1dda85654e8c04831d15aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
