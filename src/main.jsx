import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router";
import App from "./App";
import TeacherDashboard from "./screen/Teacher";
import StudentDashboard from "./screen/Student";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const str = getStorage(app)

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App db={db}/>} />
      <Route path="/teacher" element={<TeacherDashboard db={db} str={str}/>} />
      <Route path="/student" element={<StudentDashboard db={db} str={str}/>} />
    </Routes>
  </BrowserRouter>
);
