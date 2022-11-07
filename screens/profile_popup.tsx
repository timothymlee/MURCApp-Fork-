import { Pressable, StyleSheet, SafeAreaView, Text, View, Platform, StatusBar } from "react-native";
import React from 'react';
import { Icon } from "@rneui/themed";
import { Image } from "@rneui/base";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; goBack: Function; };
};

export default function Profile_PopUp(props: CompProps) {

  return (
    <>
        <View style={styles.overlay}>
            <View style={{ flex: 2, minHeight: 40, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Image source={require('../assets/images/default_pfp.png')} style={styles.profile_pic} />
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Pressable onPress={() => props.navigation.goBack()}>
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
                <Text style={{ color: 'black', fontSize: 16 }}>Profile</Text>
              </View>
            </View>
            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="fast-food" type="ionicon" size={30} color={'black'}></Icon>
              </View>
              <Pressable style={{ flex: 6, justifyContent: 'center' }} onPress={() => {props.navigation.goBack(); props.navigation.navigate('Allergies')}}>
                <Text style={{ color: 'black', fontSize: 16 }}>Allergies and Preferences</Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="image" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 16 }}>Background Image</Text>
              </View>
            </View>

            <View style={{ flex: 10 }}></View>
            <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon name="log-out" type="feather" size={30} color={'black'}></Icon>
              </View>
              <View style={{ flex: 6, justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Log Out</Text>
              </View>
            </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    paddingTop: '30%',
    paddingBottom: '20%',
    position: 'absolute',
    width: '85%',
    height: '100%'
  },
  profile_pic: {
    borderRadius: 100,
    width: 70,
    height: 70
  }
});