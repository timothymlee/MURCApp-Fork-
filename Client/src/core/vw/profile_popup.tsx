import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {useState} from 'react';
import { Icon } from "@rneui/themed";
import { Image } from "@rneui/base";
import { selectAuth } from "../../api/authSlice";
import { useAppSelector } from '../../app/hooks';
import {normalize} from '../../fileTextsizing';

import { icon_dark, bg_default, title_dark, title_mid } from '../../utils/assets/data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; goBack: Function; };
};

export default function Profile_PopUp(props: CompProps) {
  let username
  const { name } = useAppSelector(selectAuth)
  const { uploadBackground } = require("../../firebaseCalls")
  if (name  == null) {
    username = "Guest"
  } else {
    username = name
  }


  // get username from data HERE

  let logoutText = "Log In"
  let logoutIcon = "log-in"
  let logoutURL = "Login"

  if (username != "Guest") {
    logoutText = "Log Out";
    logoutIcon = "log-out";
    // set log out url
  }

  return (
      <>
        <View style={styles.overlay}>
          <View style={{ flex: 2, minHeight: normalize(40), flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image source={require('../../assets/images/default_pfp.png')} style={styles.profile_pic} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Pressable onPress={() => props.navigation.goBack()}>
                <Icon name="close" size={normalize(44)} color={title_dark}></Icon>
              </Pressable>
            </View>
          </View>
          <View style={{ flex: 1, minHeight: normalize(22) }}>
            <Text style={{ color: title_dark, fontSize: normalize(29) }}>{username}</Text>
          </View>


          <View style={{ flex: 1, minHeight: normalize(16), flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Icon name="fast-food" type="ionicon" size={normalize(30)} color={icon_dark}></Icon>
            </View>
            <Pressable style={{ flex: 6, justifyContent: 'center' }} onPress={() => { props.navigation.goBack(); props.navigation.navigate('Allergies') }}>
              <Text style={{ color: title_dark, fontSize: normalize(16) }}>Dietary Preferences</Text>
            </Pressable>
          </View>
          <View style={{ flex: 1, minHeight: normalize(16), flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Icon name="image" size={normalize(30)} color={icon_dark}></Icon>
            </View>

            <Pressable style={{ flex: 6, justifyContent: 'center' }} onPress={() => { uploadBackground(name)}}>
              <Text style={{ color: 'black', fontSize: normalize(16) }}>Background Image</Text>
            </Pressable>
          </View>

          <View style={{ flex: 10 }}></View>
          <Pressable style={styles.loginContainer} onPress={() => { props.navigation.goBack(); props.navigation.navigate(logoutURL)} }>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Icon name={logoutIcon} type="feather" size={normalize(30)} color={icon_dark}></Icon>
            </View>
            <View style={{ flex: 6, justifyContent: 'center' }}>
              <Text style={{ color: title_dark, fontSize: normalize(20) }}>{logoutText}</Text>
            </View>
          </Pressable>
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: bg_default,
    flex: 1,
    padding:normalize(20),
    paddingTop: '30%',
    paddingBottom: '20%',
    position: 'absolute',
    width: '85%',
    height: '100%'
  },
  profile_pic: {
    borderRadius: 100,
    width: normalize(70),
    height: normalize(70)
  },
  loginContainer: {
    flex: 1,
    minHeight:normalize(16),
    flexDirection: 'row'
  }
});