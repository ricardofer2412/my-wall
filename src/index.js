import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAoCvqytUuQfy93hXFx3OVYK_KbpC14IeU",
  authDomain: "wallproject-bbaee.firebaseapp.com",
  databaseURL: "https://wallproject-bbaee.firebaseio.com",
  projectId: "wallproject-bbaee",
  storageBucket: "wallproject-bbaee.appspot.com",
  messagingSenderId: "207084038275",
  appId: "1:207084038275:web:1310a00b273322283f93b6",
  measurementId: "G-CRNHD1LY7G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
