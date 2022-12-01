import { ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback } from "react-native";
import React, { useState } from 'react';
import { SearchBar, Button } from "@rneui/themed";
import { readUserData } from "../firebaseCalls";
import Widget from './Components/widget2';
import Header from "./Components/header";
import WidgetDisplay from "./Components/displayWidget";
import { selectAuth } from "../api/authSlice";
import { useAppSelector } from '../app/hooks';
import { accent3, bg_alt, bg_default, title_light, title_mid, WidgetNames } from '../assets/data';

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

  //if (name == null) { isGuest = true }

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
            containerStyle={{ backgroundColor: accent3 }}
            inputContainerStyle={{ backgroundColor: bg_default, }}
            inputStyle={{}}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
            loadingProps={{}}
            onChangeText={updateSearch}
            placeholder="Search"
            placeholderTextColor={title_mid}
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
    backgroundColor: accent3,
    minHeight: 70,
  },
  page: {
    backgroundColor: accent3,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  button: {
    padding: 20
  },
  searchText: {
    color: title_light,
    fontSize: 20,
    padding: 20
  },
  searchResultContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
  }
});
