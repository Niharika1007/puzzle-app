// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiZbgPQPt7Ex6xuPozBEoVe1o9A6MzYJo",
  authDomain: "puzzle-app-8bc7e.firebaseapp.com",
  projectId: "puzzle-app-8bc7e",
  appId: "1:433384467285:web:d33c642663cb77b2965ddc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
