import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAOOazK5jv2-Z1HoWrvks1tOxvDCnMnLkc",
      authDomain: "x-posure.firebaseapp.com",
      databaseURL: "https://x-posure.firebaseio.com",
      projectId: "x-posure",
      storageBucket: "x-posure.appspot.com",
      messagingSenderId: "237510270697"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
