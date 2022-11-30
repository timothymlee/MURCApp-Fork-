import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {useState} from 'react';
import { Icon } from "@rneui/themed";
import { Image } from "@rneui/base";
import { selectAuth } from "../../../api/authSlice";
import { useAppSelector } from '../../../app/hooks';
import { icon_dark, bg_default, title_dark, title_mid } from '../../data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; goBack: Function; };
};

export default function Profile_PopUp(props: CompProps) {
  const { name } = useAppSelector(selectAuth)
  //console.log(name);
  let username = "Guest"
  
  // get username from data HERE

  const [logoutText, setLogoutText] = useState("Log In");
  const [logoutIcon, setLogoutIcon] = useState("log-in");
  const [logoutURL, setLogoutURL] = useState("Login");

  if (name != null) {
    setLogoutText("Log Out");
    setLogoutIcon("log-out");
    // set log out url
  }

  return (
    <>
      <View style={styles.overlay}>
        <View style={{ flex: 2, minHeight: 40, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Image source={require('../../images/default_pfp.png')} style={styles.profile_pic} />
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Pressable onPress={() => props.navigation.goBack()}>
              <Icon name="close" size={44} color={title_dark}></Icon>
            </Pressable>
          </View>
        </View>
        <View style={{ flex: 1, minHeight: 16 }}>
          <Text style={{ color: title_dark, fontSize: 30 }}>{username}</Text>
        </View>
        <View style={{ flex: 1.5, minHeight: 24 }}>
          <Text style={{ color: title_mid, fontSize: 20 }}>{name}</Text>
        </View>

        <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <Icon name="fast-food" type="ionicon" size={30} color={icon_dark}></Icon>
          </View>
          <Pressable style={{ flex: 6, justifyContent: 'center' }} onPress={() => { props.navigation.goBack(); props.navigation.navigate('Allergies') }}>
            <Text style={{ color: title_dark, fontSize: 16 }}>Dietary Preferences</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, minHeight: 16, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <Icon name="image" size={30} color={icon_dark}></Icon>
          </View>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            <Text style={{ color: title_dark, fontSize: 16 }}>Background Image</Text>
          </View>
        </View>

        <View style={{ flex: 10 }}></View>
        <Pressable style={styles.loginContainer} onPress={() => { props.navigation.goBack(); props.navigation.navigate(logoutURL)} }>
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
            <Icon name={logoutIcon} type="feather" size={30} color={icon_dark}></Icon>
          </View>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            <Text style={{ color: title_dark, fontSize: 20 }}>{logoutText}</Text>
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
  },
  loginContainer: {
    flex: 1,
    minHeight: 16,
    flexDirection: 'row'
  }
});