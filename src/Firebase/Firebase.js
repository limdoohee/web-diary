import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHGUrpBSzT1_7lLMjthGfx4TBX12ALk6g",
  authDomain: "web-diary-e3eb7.firebaseapp.com",
  projectId: "web-diary-e3eb7",
  storageBucket: "web-diary-e3eb7.appspot.com",
  messagingSenderId: "1000254624332",
  appId: "1:1000254624332:web:94908869c0cc152d519ae9",
};

const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

export { db };
