import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2PtAhRtVypmK0NjXadhvbV8udo9cBxxI",
  authDomain: "pizzaria-de5fa.firebaseapp.com",
  projectId: "pizzaria-de5fa",
  storageBucket: "pizzaria-de5fa.appspot.com",
  messagingSenderId: "468038102536",
  appId: "1:468038102536:web:c9439bcd859134aca6ebbd",
};

//const app = initializeApp(firebaseConfig);
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
