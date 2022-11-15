/*
const {getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } = require("firebase/auth");
const {useCypherQuery, useAuthQuery} = require('../src/api/apiSlice');
let admin = require("firebase-admin");
const {initializeApp} = require("firebase/app");
*/

const {getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } = require("firebase/auth");
const admin = require("firebase-admin");
const {initializeApp} = require("firebase/app");
const JWT = require('jsonwebtoken');


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

signInAuth();

async function signInAuth()
{
    // Key file from firebase
    let serviceAccount = require("../muresourcecenter-firebase-adminsdk.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://muresourcecenter-8275d-default-rtdb.firebaseio.com"
    });

    // Get token that we get from Messiah

    const auth = getAuth();
    const token = JWT.sign({butter: "79573fb0f715f8951fc956b04a356a17", knife: "2ca71e9a7723fe6a", toast: "2CtLO8iB7ll1whTQe5EkXf4JmyRjtAKlvKiNNMajBb93/EZOJ9Z4cXYQ7RmRrakXjDmN353zuzAttJXqLN3wyLwuXLTbPOjgoiXhoq74mSOV4J10hzpLqmx8XEZODwUkS+OBUWLtWqlGFlu9HzxclslYACR72U1/rdQg/34fJUL+A2xIgRm2ERb/emIokppqrMO05MMCBfbpuUZSUERI2qrwjrxdKkXkAaT278xSkMM="}, 'ssh');

    try {
        let userCredential = await signInWithCustomToken(auth, token);
        console.log("Sent token to firebase");
        const user = userCredential.user;
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: " + errorCode + " :  " + errorMessage);
        // ...
    }
}
function anonymousAuth() {

    signInAnonymously(auth)
        .then(() => {
            // Signed in..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}
