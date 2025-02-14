import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging,getToken,onMessage, } from "firebase/messaging";
import './index.css'
const root = document.getElementById("root");

const firebaseConfig = {
  apiKey: "AIzaSyCPmPPA2AI8Dq3CzGUH-zusZ0kJSLsRNE0",
  authDomain: "chat-app-186d1.firebaseapp.com",
  projectId: "chat-app-186d1",
  storageBucket: "chat-app-186d1.appspot.com",
  messagingSenderId: "835388868008",
  appId: "1:835388868008:web:9ac37b128274c8bcbc099d",
  measurementId: "G-YQY2SFJ323"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App messaging={messaging}/>} />
    </Routes>
  </BrowserRouter>
);
