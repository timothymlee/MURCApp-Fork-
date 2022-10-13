import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem } from "@rneui/themed";
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function UnionMenu(props: CompProps) {
  // For linking to the Union site
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://union.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };

  // For overlay
  const [visible, setVisible] = useState(false);
  // Each drop-down menu needs a set of bool values
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
  const [expanded6, setExpanded6] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

        <Overlay 
          isVisible={visible} 
          onBackdropPress={toggleOverlay} 
          overlayStyle={styles.overlay_container}>
          <Text style={styles.overlay_heading}>Monday - Friday</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.overlay_subtitle}>Breakfast</Text>
              <Text style={styles.overlay_subtitle}>Lunch</Text>
              <Text style={styles.overlay_subtitle}>Dinner</Text>
            </View>
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <Text style={styles.overlay_times}>7:00 - 9:00</Text>
              <Text style={styles.overlay_times}>11:00 - 2:00</Text>
              <Text style={styles.overlay_times}>4:30 - 7:30</Text>
            </View>
          </View>
          <Text style={styles.overlay_heading}>Saturday - Sunday</Text>
          <View style={{flexDirection: 'row' }}>
            <View>
              <Text style={styles.overlay_subtitle}>Brunch</Text>
              <Text style={styles.overlay_subtitle}>Dinner</Text>
            </View>
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <Text style={styles.overlay_times}>9:00 - 2:00</Text>
              <Text style={styles.overlay_times}>4:30 - 7:30</Text>
            </View>
          </View>
        </Overlay>

        <View style={styles.app_container}>
          <Text style={styles.title}>Union Cafe Menu</Text>
          <Button
            title="Hours of Operation"
            buttonStyle={styles.button1}
            titleStyle={{ fontSize: 18 }}
            onPress={toggleOverlay}
          />
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
            onPress={_handlePressButtonAsync}
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
  overlay_container: {
    width: 300,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  overlay_heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6D6868',
    paddingVertical: 10
  },
  overlay_subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#968C8C'
  },
  overlay_times: {
    fontSize: 18,
    fontWeight: '500',
    color: '#968C8C'
  }
});
