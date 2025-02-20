importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Firebase config (must match your web app)
const firebaseConfig = {
  apiKey: "AIzaSyDTqNOquu2RebwbYqFd2vUWSlAwAh6fWiM",
  authDomain: "web-push-notification-fd24f.firebaseapp.com",
  projectId: "web-push-notification-fd24f",
  storageBucket: "web-push-notification-fd24f.firebasestorage.app",
  messagingSenderId: "25498026494",
  appId: "1:25498026494:web:51151492858da7d75740af"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
// messaging.onBackgroundMessage((payload) => {
//     console.log("📩 Received background message: ", payload);

//     // Show notification
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.icon,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
