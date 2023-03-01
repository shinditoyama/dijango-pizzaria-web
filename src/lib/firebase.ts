import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2U6Tfk0Eeq24WUAsA8dQnBtSZCURbmWM",
  authDomain: "dijango-s-pizzaria.firebaseapp.com",
  projectId: "dijango-s-pizzaria",
  storageBucket: "dijango-s-pizzaria.appspot.com",
  messagingSenderId: "350622771368",
  appId: "1:350622771368:web:244dea28d039d0796b7a9d",
};

//const app = initializeApp(firebaseConfig);
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
