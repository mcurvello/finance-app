import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByPnUz1_D7aajWg-Qt4gOw6f7kTcpjLNw",
  authDomain: "finance-app-33a74.firebaseapp.com",
  projectId: "finance-app-33a74",
  storageBucket: "finance-app-33a74.appspot.com",
  messagingSenderId: "1019960969188",
  appId: "1:1019960969188:web:1f75c02cafb4846393a9f1",
  measurementId: "G-16L2D924B4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
