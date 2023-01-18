import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem, Slider } from "@rneui/themed";
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import {normalize} from '../../../fileTextsizing';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};
//good without
export default function Gym(props: CompProps) {

    const [expanded1, setExpanded1] = useState(true);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const general_gym_hours = [
        { name: 'Monday: 8am - 11pm' },
        { name: 'Tuesday: 8am - 11pm' },
        { name: 'Wensday: 8am - 11pm' },
        { name: 'Thursday: 8am - 11pm' },
        { name: 'Friday: 8am - 5pm' },
        { name: 'Saturday: 10am - 6pm' },
        { name: 'Sunday: 2pm - 11pm' }
      ]


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
            <Image source={require('../../../utils/assets/images/messiah_logo.png')} style={styles.header_image}/>
          </View>
          <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
        </View>

        <View style={styles.app_container}>
          <View style={styles.banner}>
            <Image
              source={require('../../../utils/assets/images/library.jpg')}
              style={styles.banner_image} />
            <Text style={styles.main_title}>Library</Text>
          </View>
          
          <View style={styles.schedule}>
            <Text style={styles.title}>General Information</Text>
            <ScrollView>
            <ListItem.Accordion
            content={
                  <ListItem.Content>
                    <ListItem.Title>Hours</ListItem.Title>
                  </ListItem.Content>
              }
              linearGradientProps={{
                colors: ['#FBFBFB', '#F3F3F3']
              }}
              ViewComponent={LinearGradient}
              containerStyle = {styles.list_header}
              topDivider
              isExpanded={expanded1}
              onPress={() => {
                setExpanded1(!expanded1);
              }}>
              {general_gym_hours.map((l, i) => (
                <ListItem key={i}>
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ListItem.Accordion>

            <ListItem.Accordion
            content={
                  <ListItem.Content>
                    <ListItem.Title>Upcomming Events</ListItem.Title>
                  </ListItem.Content>
              }
              linearGradientProps={{
                colors: ['#FBFBFB', '#F3F3F3']
              }}
              ViewComponent={LinearGradient}
              containerStyle = {styles.list_header}
              topDivider
              isExpanded={expanded2}
              onPress={() => {
                setExpanded2(!expanded2);
              }}>
              
                <ListItem >
                  <ListItem.Content>
                  <ListItem.Title style={styles.bold_subtitle}>Trunk or Treat at Murray Library</ListItem.Title>
                  <ListItem.Title>Saturday, October 29, 6 to 8 PM. Murray Library's version of a Trunk or Treat event. 
                    Staff at Murray Library and various campus organizations will decorate library book carts and give 
                    away free treats. Vote for your favorite cart. Costumes encouraged (Prizes to be awarded)</ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                  <ListItem.Title style={styles.bold_subtitle}>20th Annual Friends of Murray Library Dinner </ListItem.Title>
                  <ListItem.Title>Friday, November 4. “A Peek Through the Looking Glass: Why Children’s Books Matter,” lecture 
                    by Anita Voelker.Registration coming soon</ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                  <ListItem.Title style={styles.bold_subtitle}>Clue Murder Mystery Night </ListItem.Title>
                  <ListItem.Title>Saturday, November 5, 6-8 PM. Sign-ups open on Tuesday, 10/25 at 7AM. Start 
                    putting together your team of up to 5 people now! Someone will be murdered in Murray Library 
                    ! Don't fear, it's all part of the Library's annual live Clue game. Can you solve the mystery 
                    before everyone else?  Follow Murray Library on Instagram for details.  Sign up will be required 
                    for Live Clue (Coming 10/25). Teams of 3 to 5 need to register together.  Spots fill quickly!</ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>
                  
                    
                  
                  </ListItem.Content>
                </ListItem>
              
            </ListItem.Accordion>
            <ListItem.Accordion
            content={
                  <ListItem.Content>
                    <ListItem.Title>Other Reasources Links</ListItem.Title>
                  </ListItem.Content>
              }
              linearGradientProps={{
                colors: ['#FBFBFB', '#F3F3F3']
              }}
              ViewComponent={LinearGradient}
              containerStyle = {styles.list_header}
              topDivider
              isExpanded={expanded3}
              onPress={() => {
                setExpanded3(!expanded3);
              }}>
              
                <ListItem >
                  <ListItem.Content>
                    <ListItem.Title><Text style={styles.link} onPress={() => {WebBrowser.openBrowserAsync("https://www.messiah.edu/info/21165/find")}}> 
                       Book Search and Ebooks</Text></ListItem.Title>
                      <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                      <ListItem.Title><Text style={styles.link} onPress={() => {WebBrowser.openBrowserAsync("https://www.messiah.edu/info/21166/research_help")}}> 
                       Research Help</Text></ListItem.Title>
                      <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                      <ListItem.Title><Text style={styles.link} onPress={() => {WebBrowser.openBrowserAsync("https://www.messiah.edu/info/21167/library_services")}}> 
                       Library Services</Text></ListItem.Title>
                      <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                      <ListItem.Title><Text style={styles.link} onPress={() => {WebBrowser.openBrowserAsync("https://www.messiah.edu/info/21168/about_the_library")}}> 
                       About the Library</Text></ListItem.Title>
                      <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                      

                    
                  </ListItem.Content>
                </ListItem>
              
            </ListItem.Accordion>
            </ScrollView>
          </View>
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  app_container: {
    backgroundColor: '#FBFBFB',
    flex: 1
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
    fontWeight: '800',
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
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 20,
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
  }
});
