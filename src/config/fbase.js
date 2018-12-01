import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyB0LxfPdGq6fNKsf_VG-IaZKks3rJwfwak",
  authDomain: "management-1df74.firebaseapp.com",
  databaseURL: "https://management-1df74.firebaseio.com",
  projectId: "management-1df74",
  storageBucket: "management-1df74.appspot.com",
  messagingSenderId: "181443068787"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: True})

export default firebase;
