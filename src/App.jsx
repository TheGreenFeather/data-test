import { useEffect, useState } from 'react';
import React from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

function App({ messaging }) {
  const [token,setToken]=useState([])
  const listenToMessage = () => {
    onMessage(messaging, (payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // const notificationTitle = payload.notification.title;
      // const notificationOptions = {
      //   body: payload.notification.body,
      //   icon: payload.notification.icon
      // };

      // self.registration.showNotification(notificationTitle, notificationOptions);
    });
  };

  const sendNotification = async () => {
    try {
        if (token.length === 0) {
            console.error('No device token available.');
            return;
        }

        const response = await axios.post('https://notification-fv06.onrender.com/api/push-notify', {
            fcmToken: token
        },{
          headers : {
            orgin: "http://localhost:5173",
            request: "https://notification-fv06.onrender.com/api/push-notify"
          }
        });

        console.log('Notification sent:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

  useEffect(() => {
    const requestNotification = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'BLMHW-HiTWfCnfoU3QgTmTh9Xg4fKK-5K-ecUGquJ5zZndJ5uffvpCSujpIFpTZO_Co2UhaCuG19LuF_MEcfM98'
          });
          setToken([token])
        }
      } catch (e) {
        console.log(e);
      }
    };

    requestNotification();
    listenToMessage();
  }, [messaging]);

  

  return (
    <div>
      <button onClick={sendNotification}>Notify</button>
      <button onClick={() => {
          axios({
            method: 'post',
            url: 'https://notification-fv06.onrender.com/api/email-notify',
            headers: {
              orgin: 'http://localhost:5173',
              request: 'https://notification-fv06.onrender.com/api/email-notify',
            }, 
            data: {
              text: 'i hope this works',
              from: 'cogiao <cogiaolmao@bruhschool.edu.vn>',
              to: 'user <lienquanaren@gmail.com>',
              subject: 'testing emailjs'
            }
          })
          .then(function (response) {
            console.log(response);
            Notification.requestPermission().then(function (result) {
              if (result !== 'granted') {
                return;
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        }}>Notify email</button>
    </div>
  );
}

export default App;