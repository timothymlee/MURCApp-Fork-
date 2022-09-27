import { ImageBackground, Pressable, StyleSheet, SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, SearchBar, Button, Overlay } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {readUserData, writeUserData} from "../src/firebaseCalls";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

type OverlayComponentProps = {};

export default function Home(props: CompProps) {

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
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Icon name="person-circle-outline" type="ionicon" size={80} color={'black'}></Icon>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Pressable onPress={toggleOverlay}>
                  <Icon name="close" size={44} color={'black'}></Icon>
                </Pressable>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'black', fontSize: 30 }}>Joe Jenkins</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={{ color: 'gray', fontSize: 20 }}>jj1234</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="person-circle" type="ionicon" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Profile</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="fast-food" type="ionicon" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Allergies and Preferences</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="image" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Background Image</Text>
              </View>
            </View>

            <View style={{ flex: 8 }}></View>
            <View style={{ flex: 1, flexDirection: 'row'  }}>
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
            <Text style={{ color: 'white', fontSize: 32 }}>MU</Text>
          </View>
          <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.app_container}>
          <Button
              title="Get Data"
              loading={false}
              loadingProps={{ size: 'small', color: 'white' }}
              buttonStyle={{
                backgroundColor: 'rgba(111, 202, 186, 1)',
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 10,
                height: 50,
                width: 200,
                marginVertical: 10,
              }}
              onPress={() => readUserData('tl1261')}
          />
        </ScrollView>

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
    backgroundColor: '#CCC',
    flex: 1
  },
  header: {
    backgroundColor: '#1E293B',
    flex: 0.1,
    flexDirection: 'row'
  },
  search_container: {
    backgroundColor: '#1E293B',
    flex: 0.14
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
  }
});
