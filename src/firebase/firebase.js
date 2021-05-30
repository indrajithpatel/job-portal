import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4Hgz4jhaNXtlDQmVFi9T21tNtpdusZQo",
    authDomain: "job-portal-3f7c2.firebaseapp.com",
    projectId: "job-portal-3f7c2",
    storageBucket: "job-portal-3f7c2.appspot.com",
    messagingSenderId: "210409861335",
    appId: "1:210409861335:web:ad3053e55e62c714334092",
    measurementId: "G-8Y2LNFGTQY"
  };

  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  console.log(firebaseApp)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth}
