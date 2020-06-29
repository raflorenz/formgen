import firebase from 'firebase/app';
import 'firebase/firestore';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrx-FONWIGuQ0UTMv-kH93kSouyZ-1vCk",
    authDomain: "formgen-20e08.firebaseapp.com",
    databaseURL: "https://formgen-20e08.firebaseio.com",
    projectId: "formgen-20e08",
    storageBucket: "formgen-20e08.appspot.com",
    messagingSenderId: "1014353730332",
    appId: "1:1014353730332:web:9aa68630cb3dabf51df8d9"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
