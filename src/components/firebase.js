import * as firebase from 'firebase';
import "firebase/auth";

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
export const auth = firebase.auth();
export default firebase;