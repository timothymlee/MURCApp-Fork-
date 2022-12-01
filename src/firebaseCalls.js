// Optionally import the services that you want to use
const {initializeApp} = require("firebase/app");
const { getDatabase, ref, onValue, get, update} = require("firebase/database");
const React = require("react");

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

// Set preferences for a user.
// input: userId, preferences object
function writeUserPreferences(userId, allergyPreferences) {
    const db = getDatabase();
    const updates = {};

    updates['users/' + userId + '/preferences/'] = allergyPreferences;
    return update(ref(db), updates);
}

// Return an array of preferences for a given user.
// input: userId
async function readUserPreferences(userId) {
    let returnObject = {};

    const db = getDatabase(myApp);

    const prefRef = ref(db, 'users/' + userId + '/preferences/');

    returnObject = await get(prefRef);

    return returnObject.val();
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
    return returnString;
}

// Return an array of events for a given day.
// date should be in YYYY-MM-DD format
async function readEventData(date) {
    let returnObjectArray = [];

    const db = getDatabase(myApp);

    const dateRef = ref(db, 'events/calendar/' + date);

    await get(dateRef).then(async (snapshot) => {
        const keys = snapshot.val()
        for (const key in keys) {
            let individualEvent = ref(db, 'events/list/' + key);
            await get(individualEvent).then((snapshot) => {
                returnObjectArray.push(snapshot.val());
            });
        }
    });
    //console.log("detDatabase is returning: "+ returnObjectArray + " .When receiving "+ date)
    return returnObjectArray;
}

async function createFirebaseProfile(userId) {
    const db = getDatabase();
    const updates = {};

    // Check for user
    const prefRef = ref(db, 'users/' + userId + '/');
    let returnObject = await get(prefRef);
    if(returnObject.val() !== null) {
        return;
    }


    const profile = {
        email: userId + "@messiah.edu",
        groups: {
            admin: false,
            safety: false
        },
        preferences: {
            dairy: false,
            egg: false,
            fish: false,
            shellfish: false,
            peanut: false,
            treenut: false,
            gluten: false,
            vegan: false
        }
    }

    updates['users/' + userId + '/'] = profile;
    return update(ref(db), updates);
}


// Export Methods for Use
module.exports = {
    writeUserPreferences,
    readUserPreferences,
    readUserData,
    readLottieData,
    readEventData,
    createFirebaseProfile
}
