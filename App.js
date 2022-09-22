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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA38k22z_pVpMK9GEAm0VkbUUVzlm1h8T8",
  authDomain: "muresourcecenter-8275d.firebaseapp.com",
  projectId: "muresourcecenter-8275d",
  storageBucket: "muresourcecenter-8275d.appspot.com",
  messagingSenderId: "384605507282",
  appId: "1:384605507282:web:dbd40e33846c4cf3f0a70b",
  measurementId: "G-H8NB4DF5XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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

