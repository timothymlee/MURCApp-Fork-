// Optionally import the services that you want to use
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA38k22z_pVpMK9GEAm0VkbUUVzlm1h8T8",
    authDomain: "muresourcecenter-8275d.firebaseapp.com",
    databaseURL: "https://muresourcecenter-8275d-default-rtdb.firebaseio.com",
    projectId: "muresourcecenter-8275d",
    storageBucket: "muresourcecenter-8275d.appspot.com",
    messagingSenderId: "384605507282",
    appId: "1:384605507282:web:dbd40e33846c4cf3f0a70b",
    measurementId: "G-H8NB4DF5XB"
};

const myApp = initializeApp(firebaseConfig);

import { getDatabase, ref, onValue} from 'firebase/database';
import {throwError} from "react-cas-client/lib/util";

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

function readUserData(userId) {
    let returnString = "\n";
    const db = getDatabase(myApp);
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            returnString += "Key: " + childSnapshot.key.toString();
            returnString += ", Val: " + childSnapshot.val().toString();
            returnString += "\n";
        });
    });
    console.log(returnString);
    return returnString;
}

function readLottieData(date) {
    let returnString = "\n";
    const db = getDatabase(myApp);
    const dateRef = ref(db, 'dining/lottie/menu/' + date);
    onValue(dateRef, (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            returnString += "Key: " + childSnapshot.key.toString();
            returnString += ", Val: " + childSnapshot.val().toString();
            returnString += "\n";
        });
    });
    console.log(returnString);
    return returnString;
}

// Export Methods for Use
export {writeUserData, readUserData, readLottieData};