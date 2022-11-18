// Optionally import the services that you want to use
const {initializeApp} = require("firebase/app");

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

const {getDatabase, ref, child, push, update, onValue} = require("firebase/database");

function writeReport(category, desc, name, email) {
    const db = getDatabase();

    // Generate key for new report
    let newEventKey = push(child(ref(db), 'reports/' + category)).key;

    if (name === undefined || name === null) {
        name = null;
        email = null;
    }

    // Add/update information onto key
    const updates = {};
    updates['reports/' + category + '/' + newEventKey] = {
        content: desc,
        name: name,
        email : email,
        date: new Date(Date()).toJSON()
    };

    update(ref(db), updates);

    process.exit();
}