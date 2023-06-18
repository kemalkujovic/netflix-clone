import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "netflix-clone-46f1f.firebaseapp.com",
  projectId: "netflix-clone-46f1f",
  storageBucket: "netflix-clone-46f1f.appspot.com",
  messagingSenderId: "174481017338",
  appId: "1:174481017338:web:14402cf001fdd443397c43",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
