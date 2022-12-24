import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDr1k7jYw-fbxOv7QBSLo3xpqnXvH8TStU",
  authDomain: "basiccrud-7023f.firebaseapp.com",
  databaseURL: "https://basiccrud-7023f-default-rtdb.firebaseio.com",
  projectId: "basiccrud-7023f",
  storageBucket: "basiccrud-7023f.appspot.com",
  messagingSenderId: "577194439353",
  appId: "1:577194439353:web:4e5d0aa6c03c79fde36168",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
