import firebase from 'react-native-firebase';

let config = {
    apiKey: "AIzaSyBksyBdWPWGFZ4rPP8poupbwFKTS8Aj-CI",
    authDomain: "accessu-c0933.firebaseapp.com",
    databaseURL: "https://accessu-c0933.firebaseio.com",
    projectId: "accessu-c0933",
    storageBucket: "accessu-c0933.appspot.com",
    messagingSenderId: "1014198677547"
  };
  let app = firebase.initializeApp(config);
  export const db = app.database(); 