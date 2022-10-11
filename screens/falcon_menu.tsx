import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem } from "@rneui/themed";
import {LinearGradient} from 'expo-linear-gradient';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function FalconMenu(props: CompProps) {

  // Each drop-down menu needs a set of bool values
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
  const [expanded6, setExpanded6] = useState(false);

  // Each menu category has items listed here
  const ice_cream_list = [
    { name: 'ice cream' },
    { name: 'ice cream' }
  ]
  const sandwich_list = [
    { name: 'ice cream' },
    { name: 'ice cream' }
  ]
  const burger_list = [
    { name: 'ice cream' },
    { name: 'ice cream' }
  ]
  const coffee_tea_list = [
    { name: 'ice cream' },
    { name: 'ice cream' }
  ]
  const pizza_list = [
    { name: 'ice cream' },
    { name: 'ice cream' }
  ]
  const u_create_list = [
    { name: 'ice cream' },
    { name: 'ice cream' }
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
            <Image source={require('../assets/images/messiah_logo.png')} style={styles.header_image} />
          </View>
          <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
        </View>

        <View style={styles.app_container}>
          <Text style={styles.title}>Falcon Menu</Text>
          <View style={styles.hours_container}>
            <Text style={styles.hours_heading}>Hours of Operation</Text>
            <Text style={styles.hours_subtitle}>Monday - Friday</Text>
            <Text style={styles.hours_times}>7:30 - 3:30</Text>
          </View>
          <ScrollView>
            <ListItem.Accordion
              content={
                  <ListItem.Content>
                    <ListItem.Title>Ice Cream</ListItem.Title>
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
              {ice_cream_list.map((l, i) => (
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
                    <ListItem.Title>Sandwiches</ListItem.Title>
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
              {sandwich_list.map((l, i) => (
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
                    <ListItem.Title>Burgers</ListItem.Title>
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
              {burger_list.map((l, i) => (
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
                    <ListItem.Title>Coffee & Tea</ListItem.Title>
                  </ListItem.Content>
              }
              linearGradientProps={{
                colors: ['#FBFBFB', '#F3F3F3']
              }}
              ViewComponent={LinearGradient}
              containerStyle = {styles.list_header}
              topDivider
              isExpanded={expanded4}
              onPress={() => {
                setExpanded4(!expanded4);
              }}>
              {coffee_tea_list.map((l, i) => (
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
                    <ListItem.Title>Pizza</ListItem.Title>
                  </ListItem.Content>
              }
              linearGradientProps={{
                colors: ['#FBFBFB', '#F3F3F3']
              }}
              ViewComponent={LinearGradient}
              containerStyle = {styles.list_header}
              topDivider
              isExpanded={expanded5}
              onPress={() => {
                setExpanded5(!expanded5);
              }}>
              {pizza_list.map((l, i) => (
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
                    <ListItem.Title>U-CREATE</ListItem.Title>
                  </ListItem.Content>
              }
              linearGradientProps={{
                colors: ['#FBFBFB', '#F3F3F3']
              }}
              ViewComponent={LinearGradient}
              containerStyle = {styles.list_header}
              topDivider
              isExpanded={expanded6}
              onPress={() => {
                setExpanded6(!expanded6);
              }}>
              {u_create_list.map((l, i) => (
                <ListItem key={i}>
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ListItem.Accordion>
            <View style={{height: 100}}></View>
            
          </ScrollView>
          <Button
            title="Order Now"
            buttonStyle={styles.button2}
            containerStyle={styles.button2_container}
            titleStyle={{ fontSize: 18 }}
            onPress={() => props.navigation.navigate('')}
          />
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
  header_icons: {
    color: 'white'
  },
  subtitle: {
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 36,
    fontWeight: '600',
    padding: 30
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  },
  button1: {
    backgroundColor: '#5EBD4E',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
    height: 50,
    marginBottom: 30
  },
  button2: {
    backgroundColor: '#1E293B',
    width: '100%',
    borderRadius: 30,
    height: 50
  },
  button2_container: {
    bottom: 0,
    position: 'absolute',
    marginBottom: 30,
    width: '85%',
    alignSelf: 'center'
  },
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  hours_heading: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white'
  },
  hours_subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#EEE'
  },
  hours_times: {
    fontSize: 18,
    fontWeight: '500',
    color: '#EEE'
  },
  hours_container: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius:  20,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#5EBD4E'
  }
});
