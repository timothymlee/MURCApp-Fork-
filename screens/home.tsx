import { ImageBackground, Pressable, StyleSheet, SafeAreaView, Text, View, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useState } from 'react';
import { Icon, SearchBar, Button } from "@rneui/themed";
import {readUserData, writeUserData} from "../src/firebaseCalls";
//import Widget from '../src/js componets/widgetsV1.3';
import Widget from './index';
import { Image } from "@rneui/base";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};
const image = {uri: "https://pbs.twimg.com/media/FdxI4qIXwAE28_5?format=jpg&name=4096x4096"}

export default function Home(props: CompProps) {
  let textString = readUserData('tl1261');

  const [value, setValue] = useState("");
  const [results, setResults] = useState([])

  let WidgetNames = [
    { name: "Union Cafe", url: 'UnionMenu' },
    { name: "Lottie Dining Hall", url: 'LottieMenu' },
    { name: "Chapel Attendance", url: 'Chapel' },
    { name: "Falcon", url: 'FalconMenu' },
    { name: "Gym", url: 'Gym' },
    { name: "Dining Dollars", url: 'DiningDollars' },
    { name: "Falcon Dollars", url: 'FalconDollars' },
    { name: "Campus Map", url: 'Map' },
    { name: "Log In", url: 'Login' },
    { name: "Drag and Drop", url: 'Index'}
  ]

  const updateSearch = (value) => {
    setValue(value);
    let storedResults = [];
    WidgetNames.forEach(element => {
      if (element.name.toLowerCase().includes(value.toLowerCase())) {
        storedResults.push(element);
      }
    });
    setResults(storedResults);
  };

  const handleSearchChange = () => {
    if (value == "") {
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
              <TouchableWithoutFeedback>
              <Widget navFun={props}/>
              </TouchableWithoutFeedback>
              {/*<Text style={{fontSize: 20, color: 'white'}}>Data = {textString}</Text>*/}
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
            onChangeText={updateSearch}
            placeholder="Search"
            placeholderTextColor="#888"
            value={value}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
      )
    }
    else {
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
            <Text style={styles.searchText}>Searching For "{value}"</Text>
            <View style={styles.searchResultContainer}>
            {results.map((result, i) =>
              <Button key={i} style={styles.button} onPress={() => props.navigation.navigate(result.url)}>{result.name}</Button>
            )}
            </View>
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
            onChangeText={updateSearch}
            placeholder="Search"
            placeholderTextColor="#888"
            value={value}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
      )
    }
  }
  return (handleSearchChange());
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
  },
  searchText: {
    color: 'white',
    fontSize: 20,
    padding: 20
  },
  searchResultContainer: {
    flex: 1
  }
});
