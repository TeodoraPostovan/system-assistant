// import * as firebase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
    apiKey: "AIzaSyDUaCiQggj7OVeyQumgQ1MCSIhiKvncRpQ",
    authDomain: "system-assistant-bf1f6.firebaseapp.com",
    databaseURL: "https://ystem-assistant-bf1f6.firebaseio.com",
    projectId: "system-assistant-bf1f6",
    storageBucket: "system-assistant-bf1f6.appspot.com",
    messagingSenderId: "500725826544",
    appId: "1:500725826544:web:abdf314b562c3cb0009335",
    measurementId: "G-FMHJ63G3JH"
  };

export const firebaseApp = firebase.initializeApp(config);