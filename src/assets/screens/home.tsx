import { ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback } from "react-native";
import React, { useState } from 'react';
import { SearchBar, Button } from "@rneui/themed";
import { readUserData } from "../../firebaseCalls";
import Widget from './Components/widget2';
import Header from "./Components/header";
import WidgetDisplay from "./Components/displayWidget";
import { selectAuth } from "../../api/authSlice";
import { useAppSelector } from '../../app/hooks';
import { WidgetNames } from '../data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};
const image = { uri: "https://pbs.twimg.com/media/FdxI4qIXwAE28_5?format=jpg&name=4096x4096" }

let isGuest = false;
//const { name } = useAppSelector(selectAuth)

export default function Home(props: CompProps) {
  let textString = readUserData('tl1261');
  const { name } = useAppSelector(selectAuth)

  if (name == null) { isGuest = true }

  const [value, setValue] = useState("");
  const [results, setResults] = useState([])

  const updateSearch = (value) => {
    setValue(value);
    let storedResults = [];
    WidgetNames.forEach(element => {
      if (element.name.toLowerCase().includes(value.toLowerCase())) {
        element["key"] = element["key"]+1000;
        storedResults.push(element);
      }
    });
    setResults(storedResults);
  };

  const handleSearchChange = () => {
    if (value == "") {
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
                <WidgetDisplay widget={result} key={result.key}/>
             )}
          </View>
        </>
      )
    }
  }
  
  /**/
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
