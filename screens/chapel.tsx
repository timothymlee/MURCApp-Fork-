import { ImageBackground, Pressable, StyleSheet, SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, SearchBar, Button, Overlay, Image } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Home(props: CompProps) {

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
            <View style={{ flex: 1, flexDirection: 'row' }}>
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

        <View style={styles.app_container}>
          <Image
            source={require('../assets/images/Hostetter_Chapel-1.jpeg')}
            containerStyle={styles.header_image_cont}
            style={styles.header_image}
          />
          <Text style={styles.main_title}>Chapel Attendance</Text>
          <View style={{ flex: 3}}>
            <View style={styles.progress_container}>

            </View>

            <View style={{flex: 0.5, flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Chapels Attended</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Chapels Required</Text>
              </View>
            </View>
            <View style={{flex: 0.5, flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>9</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>14</Text>
              </View>
            </View>
            <View style={{flex: 0.5, flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Chapel Adjustment</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Remaining Chapels</Text>
              </View>
            </View>
            <View style={{flex: 0.5, flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>0</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>5</Text>
              </View>
            </View>
            <View style={{ flex: 3 }}></View>
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
    flex: 0.1,
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
  header_image_cont: {
    flex: 1
  },
  header_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  progress_container: {
    flex: 0.6,
    backgroundColor: 'gray'
  },
  subtitle: {
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 40,
    fontWeight: '700'
  },
  main_title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    position: 'absolute',
    padding: 20,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    paddingTop: '28%'
  }
});
