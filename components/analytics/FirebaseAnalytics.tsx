import React from 'react';
import Script from 'next/script';

function FirebaseAnalytics() {
  // if (process.env.NODE_ENV !== 'production') {
  //   return null;
  // }
  return (
    <>
      <Script
        id="firebaseApp"
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries
          
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
              apiKey: "AIzaSyAVhsch2_emuZmD9KLh3kVkRr3rSUm7m6g",
              authDomain: "catch-a-nest.firebaseapp.com",
              projectId: "catch-a-nest",
              storageBucket: "catch-a-nest.appspot.com",
              messagingSenderId: "581628041764",
              appId: "1:581628041764:web:622697f154d3faae6a16b1",
              measurementId: "G-H82Q5FTZYK"
            };
          
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);
            console.log(analytics);
          `,
        }}
      />
      {/* <Script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js" />
      <Script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-analytics.js" />
      <Script
        defer
        dangerouslySetInnerHTML={{
          __html: `
              // Your web app's Firebase configuration
              // For Firebase JS SDK v7.20.0 and later, measurementId is optional
              var firebaseConfig = {
                apiKey: 'AIzaSyAVhsch2_emuZmD9KLh3kVkRr3rSUm7m6g',
                authDomain: 'catch-a-nest.firebaseapp.com',
                projectId: 'catch-a-nest',
                storageBucket: 'catch-a-nest.appspot.com',
                messagingSenderId: '581628041764',
                appId: '1:581628041764:web:622697f154d3faae6a16b1',
                measurementId: 'G-H82Q5FTZYK',
              };
              // Initialize Firebase
              if(window?.firebase){
                if(!firebase.apps.length){
                  firebase.initializeApp(firebaseConfig);                    
                } else {
                  firebase.app();
                }
                firebase.analytics();
              }
            `,
        }}
      /> */}
    </>
  );
}

export default React.memo(FirebaseAnalytics);
