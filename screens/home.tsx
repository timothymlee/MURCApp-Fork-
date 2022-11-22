import { ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback } from "react-native";
import React, { useState } from 'react';
import { SearchBar, Button } from "@rneui/themed";
import { readUserData, writeUserData } from "../src/firebaseCalls";
import Widget from './widget2';
import Header from "./header";
import WidgetDisplay from "./displayWidget";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};
const image = { uri: "https://pbs.twimg.com/media/FdxI4qIXwAE28_5?format=jpg&name=4096x4096" }

let isGuest = true;

export default function Home(props: CompProps) {
  let textString = readUserData('tl1261');

  const [value, setValue] = useState("");
  const [results, setResults] = useState([])
  const [scrolling, setScrolling] = useState(true);

  // All icons for resources
  let resourceImages = [
    "md-restaurant",
    "logo-usd",
    "calendar",
    "book",
    "md-locate-sharp"
  ]

  let lightBlue = "#6EB3F2"
  let blue = '#4552C9'
  let darkBlue = '#1E293B'
  let green = '#5EBD4E'

  let WidgetNames = [
    { name: "Lottie Dining Hall", url: 'LottieMenu', icon: resourceImages[0], size: 6, color: darkBlue, guest: true },
    { name: "Union Cafe", url: 'UnionMenu', icon: resourceImages[0], size: 0, color: lightBlue, guest: true },
    { name: "Campus Map", url: 'Map', icon: resourceImages[3], size: 0, color: darkBlue, guest: true },
    { name: "Log In", url: 'Login', icon: resourceImages[4], size: 0, color: blue, guest: true },
    { name: "Drag and Drop", url: 'Index', icon: resourceImages[4], size: 0, color: lightBlue, guest: true },
    { name: "Chapel Attendance", url: 'Chapel', icon: resourceImages[1], size: 4, color: green, guest: false },
    { name: "Falcon", url: 'FalconMenu', icon: resourceImages[2], size: 0, color: blue, guest: true },
    { name: "Gym", url: 'Gym', icon: resourceImages[3], size: 0, color: green, guest: true },
    { name: "Dining Dollars", url: 'DiningDollars', icon: resourceImages[1], size: 1, color: lightBlue, guest: false },
    { name: "Falcon Dollars", url: 'FalconDollars', icon: resourceImages[1], size: 1, color: lightBlue, guest: false },
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
  //scroll disabled is needed for drag and drop to work on ios.
  //I need to add something in index that
  //handleWidgetMove should hopefully disabel / enable scroll view for
  //ios devices to work.
  const handleSearchChange = () => {
    if (value == "") {
      const handleWidgetMove = scroll => {
        setScrolling(scrolling => scroll)
      }
      return (
        <>
          <View style={styles.app_container}>
            <TouchableWithoutFeedback>
              <Widget guest={isGuest} widgets={WidgetNames} />
            </TouchableWithoutFeedback>
          </View>
        </>
      )
    }
    else {
      return (
        <>
          <Text style={styles.searchText}>Searching For "{value}"</Text>
          <View style={styles.searchResultContainer}>
            {results.map((result, i) =>
              <WidgetDisplay widget={result}/>
            )}
          </View>
        </>
      )
    }
  }
  return (
    <>
      <SafeAreaView style={styles.page}>
        <Header props={props} />

        <View style={styles.app_container}>
          <ImageBackground source={image} style={styles.bg_image} >
            {handleSearchChange()}
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

const styles = StyleSheet.create({
  app_container: {
    flex: 1
  },
  bg_image: {
    justifyContent: "center",
    flex: 1,
    resizeMode: 'cover'
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
  searchText: {
    color: 'white',
    fontSize: 20,
    padding: 20
  },
  searchResultContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
  }
});
