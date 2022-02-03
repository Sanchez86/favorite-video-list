import React from 'react';
import logo from './logo.svg';
import './App.css';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDllkz_Ht5LRMIeMh5s-XaY7L9EEAXc3TU",
//   authDomain: "favorite-video-list.firebaseapp.com",
//   projectId: "favorite-video-list",
//   storageBucket: "favorite-video-list.appspot.com",
//   messagingSenderId: "33538553412",
//   appId: "1:33538553412:web:c5b565002d0411866bee11",
//   measurementId: "G-3M8TMNZBXV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
