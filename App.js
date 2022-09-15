import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Button,StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

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
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://union.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };

  
  return (
    <View style={styles.container}>
      <Button title="eats" onPress={_handlePressButtonAsync} />
     
    </View>
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
