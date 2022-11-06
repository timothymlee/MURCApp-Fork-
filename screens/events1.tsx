import React,{createRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {useAsync} from "react-async";
import { async } from '@firebase/util';
// Optionally import the services that you want to use
const {initializeApp} = require("firebase/app");
const todaysDate = ((new Date().getFullYear().toLocaleString())+'-'+(new Date().getMonth() + 1).toLocaleString())+'-'+(new Date().getDate().toLocaleString())
let selectedDate = todaysDate;
selectedDate = "2022-11-5";


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
const DummbyWebData = [
    { DataDate:'2022-11-5',title: 'Kirk Reese, Piano & Gavin Horning, Gutar Faculty Recital', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
    { DataDate:'2022-11-5',title: 'Now and Then" Jack Troy', date: 'October 27th, 2022 - November 20th, 2022', location:'Climenhaga Building, Aughinbaugh Gallery',time:' 7:30pm-8:30pm', cost: 'Free & Open to Public',moreDetails:'Now and Then" Jack Troy A retrospective exhibition of the work of a renowned wood firing potter and poet. Hosted in conjunction with the Department of Language, Literature and Writings Poets and Writers Series' },
    { DataDate:'2022-11-5',title: 'Ricardos Grand singing for deaf children', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
    { DataDate:'2022-11-5',title: 'Goffy returns to school to finished the surviving children', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
    { DataDate:'2022-11-5',title: 'How to run from the police', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
    { DataDate:'2022-11-5',title: 'How to live knowing your a mistake', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' }

  ]
  
  console.log(DummbyWebData)
const { getDatabase, ref, get} = require("firebase/database");
let returnObjectArray = [];
type CompProps = {
    // We are only using the navigate and goBack functions
    navigation: { navigate: Function; };
  };
  let item;
    
  
 

  
export default class Widget extends React.Component{
constructor(props: CompProps){
    super(props);
    
    readEventData(selectedDate)
    async function readEventData(date) {
      

        const db = getDatabase(myApp);
    
        const dateRef = ref(db, 'events/calendar/' + date);
        let i = 0;
        item = await get(dateRef).then(async (snapshot) => {
            
            const keys = snapshot.val()
            for (const key in keys) {
                
                let individualEvent = ref(db, 'events/list/' + key);
                await get(individualEvent).then((snapshot) => {
                    let test = (snapshot.val())
                    console.log();
                    console.log(typeof test["title"]);
                    returnObjectArray.push(snapshot.val());
                });
            }
        }
        
        );

        
    }
}       
render(){
    return (<View><Text>hello</Text><Text>hi</Text></View>);
  } 
}
