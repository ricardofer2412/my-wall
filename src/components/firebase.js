import * as firebase from 'firebase';


const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyAoCvqytUuQfy93hXFx3OVYK_KbpC14IeU",
  authDomain: "wallproject-bbaee.firebaseapp.com",
  databaseURL: "https://wallproject-bbaee.firebaseio.com",
  projectId: "wallproject-bbaee",
  storageBucket: "wallproject-bbaee.appspot.com",
  messagingSenderId: "207084038275",
  appId: "1:207084038275:web:1310a00b273322283f93b6",
  measurementId: "G-CRNHD1LY7G"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;