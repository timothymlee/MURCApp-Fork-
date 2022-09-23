import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens to use for navigation
import Home from './screens/home';
import Index from './screens/index';

const Stack = createNativeStackNavigator();

/* Structure will be:

    <Stack.Screen ... />
    {props => (...)}

    for each screen. Must be imported above first.
    See documentation: https://reactnavigation.org/docs/native-stack-navigator/

    The top of the stack is the default page.
*/


// Optionally import the services that you want to use
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

let myApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name = "Home" component = {Home} />
          {props => (<Home {...props} />)}
        <Stack.Screen name = "Index" component = {Index} />
          {props => (<Index {...props} />)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { getDatabase, ref, onValue } from 'firebase/database';

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function readUserData(userId) {
  const db = getDatabase();
  const ref = db.ref('users/');
  console.log(ref.once('userId'), function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();

      console.log("Key: " + childKey + ", Val: " + childData);
    });
  });
}
