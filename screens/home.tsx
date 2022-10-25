import { ImageBackground, Pressable, StyleSheet, SafeAreaView, Text, View, KeyboardAvoidingView, Platform, StatusBar, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, SearchBar, Button } from "@rneui/themed";
import {readUserData, writeUserData} from "../src/firebaseCalls";
import Widget from '../src/js componets/widgetsV1.3';
import { Image } from "@rneui/base";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};
const image = {uri: "https://pbs.twimg.com/media/FdxI4qIXwAE28_5?format=jpg&name=4096x4096"}

export default function Home(props: CompProps) {
  let textString = readUserData('tl1261');

  const [value, setValue] = useState("");

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
          <ImageBackground source={image} style={styles.bg_image} >
            <ScrollView style={styles.app_container}>
              <Button style={styles.button} onPress={() => props.navigation.navigate('Chapel')}>Chapel</Button>
              <Button style={styles.button} onPress={() => props.navigation.navigate('UnionMenu')}>Union</Button>
              <Button style={styles.button} onPress={() => props.navigation.navigate('FalconMenu')}>Falcon</Button>
              <Button style={styles.button} onPress={() => props.navigation.navigate('Login')}>Log In Page</Button>
              <Button style={styles.button} onPress={() => props.navigation.navigate('Gym')}>Gym</Button>
              <Button style={styles.button} onPress={() => props.navigation.navigate('DiningDollars')}>Dining Dollars Balance</Button>
              <Button style={styles.button} onPress={() => props.navigation.navigate('FalconDollars')}>Falcon Dollars Balance</Button>
              <Widget/>
              <Text style={{fontSize: 20, color: 'white'}}>Data = {textString}</Text>
            </ScrollView>
          </ImageBackground>
        </View>

        <KeyboardAvoidingView style={styles.search_container} behavior="position">
          <SearchBar
            platform="ios"
            containerStyle={{ backgroundColor: "#1E293B" }}
            inputContainerStyle={{ backgroundColor: '#F3F3F3', }}
            inputStyle={{}}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
            loadingProps={{}}
            onChangeText={newVal => setValue(newVal)}
            placeholder="Search"
            placeholderTextColor="#888"
            value={value}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1
  },
  bg_image:{
    justifyContent: "center",
    flex: 1,
    resizeMode: 'cover'
  },
  header: {
    backgroundColor: '#1E293B',
    minHeight: 60,
    flexDirection: 'row'
  },
  search_container: {
    backgroundColor: '#1E293B',
    minHeight: 70,
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header_content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  header_icons: {
    color: 'white'
  },
  profile_overlay: {
    backgroundColor: 'white',
    flex: 8,
    padding: 20
  },
  overlay: {
    width: '85%',
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  button: {
    padding: 20
  },
  profile_pic: {
    borderRadius: 100,
    width: 70,
    height: 70
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  }
});
