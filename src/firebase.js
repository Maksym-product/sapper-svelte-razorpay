import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAfhRRU-XixwrLKk3lrc4NGSZEoVKpy-sI",
    authDomain: "sapper-auth-4af85.firebaseapp.com",
    databaseURL: "https://sapper-auth-4af85.firebaseio.com",
    projectId: "sapper-auth-4af85",
    storageBucket: "sapper-auth-4af85.appspot.com",
    messagingSenderId: "311672902327",
    appId: "1:311672902327:web:453151ac4ac5eeecbbb332"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();