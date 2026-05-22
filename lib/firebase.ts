import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlkhpLx2h-b7oUFZFLQytKBPHeNvy1C0c",
  authDomain: "fantabrook-pocket-heist.firebaseapp.com",
  projectId: "fantabrook-pocket-heist",
  storageBucket: "fantabrook-pocket-heist.firebasestorage.app",
  messagingSenderId: "864103946408",
  appId: "1:864103946408:web:04732740dc4aa89848ca9d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
