import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBXuetAfoQdn-yzvcFAAsqWx2tvfNye9bU",
  authDomain: "netflix-clone-46f1f.firebaseapp.com",
  projectId: "netflix-clone-46f1f",
  storageBucket: "netflix-clone-46f1f.appspot.com",
  messagingSenderId: "174481017338",
  appId: "1:174481017338:web:14402cf001fdd443397c43",
};

const firebaseApp = firebase.intializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
