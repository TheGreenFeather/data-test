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
  apiKey: "AIzaSyDTqNOquu2RebwbYqFd2vUWSlAwAh6fWiM",
  authDomain: "web-push-notification-fd24f.firebaseapp.com",
  projectId: "web-push-notification-fd24f",
  storageBucket: "web-push-notification-fd24f.firebasestorage.app",
  messagingSenderId: "25498026494",
  appId: "1:25498026494:web:51151492858da7d75740af"
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
