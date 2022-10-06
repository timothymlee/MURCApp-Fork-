import { ImageBackground, Pressable, StyleSheet, SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, SearchBar, Button, Overlay } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {readUserData, writeUserData} from "../src/firebaseCalls";
import Widget from '../src/js componets/widgetsV1.2';
import { Image } from "@rneui/base";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};
const image = {uri: "https://pbs.twimg.com/media/FdxI4qIXwAE28_5?format=jpg&name=4096x4096"}
type OverlayComponentProps = {};

export default function Home(props: CompProps) {
  let textString = readUserData('tl1261');

  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SafeAreaView style={styles.page}>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.profile_overlay}>
            <View style={{ flex: 2, minHeight: 40, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Image source={require('../assets/images/default_pfp.png')} style={styles.profile_pic}/>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Pressable onPress={toggleOverlay}>
                  <Icon name="close" size={44} color={'black'}></Icon>
                </Pressable>
              </View>
            </View>
            <View style={{ flex: 1, minHeight: 16 }}>
              <Text style={{ color: 'black', fontSize: 30 }}>Joe Jenkins</Text>
            </View>
            <View style={{ flex: 1.5, minHeight: 24 }}>
              <Text style={{ color: 'gray', fontSize: 20 }}>jj1234</Text>
            </View>

            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="person-circle" type="ionicon" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Profile</Text>
              </View>
            </View>
            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="fast-food" type="ionicon" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Allergies and Preferences</Text>
              </View>
            </View>
            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="image" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Background Image</Text>
              </View>
            </View>

            <View style={{ flex: 10 }}></View>
            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row'  }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Icon name="log-out" type="feather" size={30} color={'black'}></Icon>
                </View>
                <View style={{ flex: 6, justifyContent: 'center' }}>
                  <Text style={{ color: 'black', fontSize: 20 }}>Log Out</Text>
                </View>
              </View>
            <View style={{ flex: 1.5, backgroundColor: null }}></View>
          </View>
        </Overlay>

        <View style={styles.header}>
          <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
            <Pressable onPress={toggleOverlay}>
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