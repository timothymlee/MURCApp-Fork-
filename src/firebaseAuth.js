const {getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } = require("firebase/auth");
const admin = require("firebase-admin");
const {initializeApp} = require("firebase/app");
const JWT = require('jsonwebtoken');
const serviceAccount = require("../muresourcecenter-firebase-adminsdk.json");
const {createFirebaseProfile} = require("firebaseCalls");

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

authenticateWithFirebase("tl1261");

async function authenticateWithFirebase(user_id)
{
    // Key file from firebase
    let serviceAccount = require("../muresourcecenter-firebase-adminsdk.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://muresourcecenter-8275d-default-rtdb.firebaseio.com"
    });

    // Only grant token if authorized through Messiah (Redux state?)
    const auth = getAuth();
    const token = JWT.sign({uid: user_id}, serviceAccount.private_key,
        {
                issuer: serviceAccount.client_email,
                subject: serviceAccount.client_email,
                audience: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
                expiresIn: '1h',
                algorithm : 'RS256'});

    try {
        let userCredential = await signInWithCustomToken(auth, token);
        const user = userCredential.user;
        await createFirebaseProfile(user);
        return userCredential;
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: " + errorCode + " |||| " + errorMessage);
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
// Export Methods for Use
module.exports = {
    authenticateWithFirebase
}
