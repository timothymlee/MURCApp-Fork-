import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem, Slider } from "@rneui/themed";
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import {readEventData} from '../../firebaseCalls'
import { runTransaction } from "firebase/database";
type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Events1(props: CompProps) {
  const todaysDate = ((new Date().getFullYear().toLocaleString())+'-'+(new Date().getMonth() + 1).toLocaleString())+'-'+(new Date().getDate().toLocaleString())
 
  let selectedDate = todaysDate;
  selectedDate = "2022-11-5";

  


  

  async function genEventsData(){
   
    let todaysEvent = await readEventData(selectedDate);
    
    return todaysEvent
  }
    
  
  
    
  
   
    const DummbyWebData = [
      { DataDate:'2022-11-5',title: 'Kirk Reese, Piano & Gavin Horning, Gutar Faculty Recital', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
      { DataDate:'2022-11-5',title: 'Now and Then" Jack Troy', date: 'October 27th, 2022 - November 20th, 2022', location:'Climenhaga Building, Aughinbaugh Gallery',time:' 7:30pm-8:30pm', cost: 'Free & Open to Public',moreDetails:'Now and Then" Jack Troy A retrospective exhibition of the work of a renowned wood firing potter and poet. Hosted in conjunction with the Department of Language, Literature and Writings Poets and Writers Series' },
      { DataDate:'2022-11-5',title: 'Ricardos Grand singing for deaf children', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
      { DataDate:'2022-11-5',title: 'Goffy returns to school to finished the surviving children', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
      { DataDate:'2022-11-5',title: 'How to run from the police', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' },
      { DataDate:'2022-11-5',title: 'How to live knowing your a mistake', date: 'October 27th 2022', location:'Calvin and Janet High Center for Worship and Performing Arts',time:'9:00am - 7:00pm', cost: 'Free & Open to Public',moreDetails:'' }

    ]
    




 

  const Card = () => {
      const Card2 = [];
      
      DummbyWebData.forEach((data, index) => {
          if(DummbyWebData[index].DataDate == selectedDate){
              Card2.push(
               
                  <View  style={styles.center} key={index}>
                  
                  <View style={styles.card}>
                    
                    <View style={styles.pad}><Text style={styles.bold_subtitle}>{data.title}</Text></View>
                    <View style={styles.pad}>
                        <Text><Text style={styles.bold_subtitle}>Date: </Text ><Text style={styles.subtitle}>{data.date}</Text></Text>
                        
                        <Text><Text style={styles.bold_subtitle}>Location: </Text><Text style={styles.subtitle}>{data.location}</Text></Text>
      
                        <Text><Text style={styles.bold_subtitle}>Time: </Text><Text style={styles.subtitle}>{data.time}</Text></Text>
                        
                        <Text><Text style={styles.bold_subtitle}>Cost: </Text><Text style={styles.subtitle}>{data.cost}</Text></Text>
                    </View>
                    
                  </View>
                </View>
              
          );     
          }    
          
      });
          return <View>{Card2}</View>
      
  }
return (
  <>
  
    <SafeAreaView style={styles.page}>
      
      <View style={styles.header}>
        <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
          <Pressable onPress={() => props.navigation.navigate('Settings')}>
            <Icon name="person" style={styles.header_icons} size={44} color={'white'}></Icon>
          </Pressable>
        </View>
        <View style={[styles.header_content, { alignItems: 'center' }]}>
          <Image source={require('../assets/images/messiah_logo.png')} style={styles.header_image}/>
        </View>
        <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
          <Pressable onPress={() => props.navigation.navigate('Home')}>
            <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
          </Pressable>
        </View>
      </View>

      <View style={styles.app_container}>
        <View style={styles.schedule}>
          <Text style={styles.title}>Hi</Text>
          <ScrollView>
          
           <Card/>
          
          </ScrollView>
        </View>
      </View>

    </SafeAreaView>
  </>
);

  
 
  } ;

 


const styles = StyleSheet.create({
  app_container: {
    backgroundColor: '#FBFBFB',
    flex: 1
  },
  card: {
    height: 300,
    width: '90%',
    backgroundColor:'grey',
    borderRadius: 25,
    margin:10,
    padding: 10

  },
  pad:{
    padding: 10,
  },
  header: {
    backgroundColor: '#1E293B',
    minHeight: 60,
    flexDirection: 'row'
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1
  },
  header_content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  bold_subtitle:{
    fontWeight: '600',
    fontSize: 18,
  },
  header_icons: {
    color: 'white'
  },
  banner_image_cont: {
    flex: 1
  },
  banner_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  progress_container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    fontSize:17,
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 36,
    fontWeight: '700',
    padding: 10,
    marginTop: 10

  },
  main_title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '600',
    position: 'absolute',
    padding: 20,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    bottom: 0
  },
  banner: {
    flex: .15,
    minHeight: 100
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  },
  schedule:{
   flex: .85
  },
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  link:{
    color: 'blue'
  },
  center:{
    alignItems: 'center',
  }
});
