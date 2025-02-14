importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Firebase config (must match your web app)
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log("📩 Received background message: ", payload);

    // Show notification
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || "/icon.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
