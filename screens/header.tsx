import { Pressable, StyleSheet, View, Platform, StatusBar } from "react-native";
import React from 'react';
import { Icon } from "@rneui/themed";
import { Image } from "@rneui/base";

export default function Header(props) {
    return (
        <View style={styles.header}>
            <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
                <Pressable onPress={() => props.props.navigation.navigate('Settings')}>
                    <Icon name="person" style={styles.header_icons} size={44} color={'white'}></Icon>
                </Pressable>
            </View>
            <View style={[styles.header_content, { alignItems: 'center' }]}>
                <Image source={require('../assets/images/messiah_logo.png')} style={styles.header_image} />
            </View>
            <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
                <Pressable onPress={() => props.props.navigation.navigate('Home')}>
                    <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#1E293B',
      minHeight: 60,
      flexDirection: 'row'
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
    header_image: {
      width: 120,
      height: 30,
      resizeMode: 'cover'
    },
})