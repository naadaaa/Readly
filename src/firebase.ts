import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGDIFVrXq5HCKFfSzfnYDJKDAk0IReGIU",
  authDomain: "readly-29a35.firebaseapp.com",
  projectId: "readly-29a35",
  storageBucket: "readly-29a35.firebasestorage.app",
  messagingSenderId: "242280295659",
  appId: "1:242280295659:web:ab8a2f63676169047aa2ae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);