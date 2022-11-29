import { Pressable, StyleSheet, View, Platform, StatusBar } from "react-native";
import React from 'react';
import { Icon } from "@rneui/themed";
import { Image } from "@rneui/base";

export default function Header(props) {
    return (
        <View style={styles.header}>
            <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
                <Pressable onPress={() => props.props.navigation.navigate('Settings')}>
                    <Icon name="person-circle-outline" style={styles.header_icons} type={'ionicon'} size={38} color={'white'}></Icon>
                </Pressable>
            </View>
            <View style={[styles.header_content, { alignItems: 'center' }]}>
                <Image source={require('../../images/messiah_logo.png')} style={styles.header_image} />
            </View>
            <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
                <Pressable onPress={() => props.props.navigation.navigate('Home')}>
                    <Icon name="ios-home" style={styles.header_icons} type={'ionicon'} size={30} color={'white'}></Icon>
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
      padding: 10,
      paddingHorizontal: 14
    },
    header_icons: {
      color: 'white'
    },
    header_image: {
      width: 120,
      height: 30,
      resizeMode: 'cover'
    },
})