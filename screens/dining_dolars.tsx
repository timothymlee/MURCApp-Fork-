import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem, Slider } from "@rneui/themed";
import {Range, Account} from '../src/js componets/dropdownRange';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';


type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function DiningDollars(props: CompProps) {
    var balance = '$'+'478.23';
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
   
      const history_range = [
        { label: 'Past year', value: '1' },
        { label: 'Past 6 months', value: '2' },
        { label: 'Past month', value: '3' },
        { label: 'Past week', value: '4' },
        { label: 'Today', value: '5' },
      ];
    const id_num = '02051278'
    const title = [
        [['DATE'],['LOCATION'],['DEBIT'],['CREDIT'],['BALANCE']] 
    ]
    const id_history = [
        [['09/16/22'],['Union Cafe'],['6.75'],['0.00'],['478.23']] ,
        [['09/16/22'],['Union Cafe'],['4.75'],['0.00'],['484.98']] ,
        [['09/15/22'],['Union Cafe'],['8.75'],['0.00'],['489.73']] ,
        [['09/15/22'],['Union Cafe'],['5.95'],['0.00'],['498.48']] ,
        [['09/15/22'],['Union Cafe'],['4.75'],['0.00'],['504.43']] ,
        [['09/14/22'],['Union Cafe'],['6.75'],['0.00'],['509.18']] ,
        [['09/14/22'],['Union Cafe'],['4.75'],['0.00'],['515.93']] ,
        [['09/13/22'],['Union Cafe'],['8.75'],['0.00'],['520.68']] ,
        [['09/12/22'],['Union Cafe'],['5.95'],['0.00'],['529.43']] ,
        [['09/12/22'],['Union Cafe'],['4.75'],['0.00'],['534.18']] ,
        [['09/16/22'],['Union Cafe'],['6.75'],['0.00'],['538.23']] ,
        [['09/16/22'],['Union Cafe'],['4.75'],['0.00'],['546.75']] ,
        [['09/15/22'],['Union Cafe'],['8.75'],['0.00'],['550.75']] ,
        [['09/15/22'],['Union Cafe'],['5.95'],['0.00'],['558.97']] ,
        [['09/15/22'],['Union Cafe'],['4.75'],['0.00'],['562.43']] ,
        [['09/14/22'],['Union Cafe'],['6.75'],['0.00'],['568.18']] ,
        [['09/14/22'],['Union Cafe'],['4.75'],['0.00'],['564.93']] ,
        [['09/13/22'],['Union Cafe'],['8.75'],['0.00'],['570.68']] ,
        [['09/12/22'],['Union Cafe'],['5.95'],['0.00'],['575.43']] ,
        [['09/12/22'],['Union Cafe'],['4.75'],['0.00'],['581.18']] ,
      ]


  return (
    <>
      <SafeAreaView style={styles.page}>
        
        <View style={styles.header}>
          <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
            <Pressable onPress={() => props.navigation.navigate('Settings')}>
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
          
          <View>            
            <Text style={styles.title}>Dining Dollars</Text>
          </View>

          <View>
                <View>
                {title.map((l, i) => (
                    <ListItem key={i}>
                    <ListItem.Content style={styles.row}>
                        <ListItem.Title style={styles.rowItem}>{title[i][0]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{title[i][1]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{title[i][2]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{title[i][3]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{title[i][4]}</ListItem.Title>

                    </ListItem.Content>
                    </ListItem>
              ))}
                </View>
                    
            <ScrollView style={styles.scroll}>
                <View >
                {id_history.map((l, i) => (
                    <ListItem key={i}>
                    <ListItem.Content style={styles.row}>
                        <ListItem.Title style={styles.rowItem}>{id_history[i][0]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{id_history[i][1]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{id_history[i][2]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{id_history[i][3]}</ListItem.Title>
                        <ListItem.Title style={styles.rowItem}>{id_history[i][4]}</ListItem.Title>

                    </ListItem.Content>
                    </ListItem>
              ))}
                </View>
                
            </ScrollView>
            
          </View>
          <View style={styles.box}>
                <Text style={styles.main_title2}>Current Balance</Text>
                <Text style={styles.main_title}>{balance}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Account></Account>
            <Range></Range>
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
    minHeight: 60,
    flexDirection: 'row'
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1
  },
  scroll: {
    height: "50%",
  },
 
  row: {
    flexDirection: "row"
  },
  rowItem:{
    width: "20%",
    textAlign: "center"
  },
  header_content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  bold_subtitle:{
    fontWeight: '600',
    fontSize: 18,
  },
  header_icons: {
    color: 'white'
  },
  banner_image_cont: {
    flex: 1
  },
  banner_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  progress_container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 20,
    fontWeight: '700',
    padding: 10,
    marginTop: 10

  },
  main_title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    padding: 20,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    paddingTop: 0
    
  },
  main_title2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 0,
    padding: 20,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    
  },
  box: {
    backgroundColor: 'blue',
    width: "35%",
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
    marginTop: '2%',
    marginRight:'6%',
    alignSelf: 'flex-end'
  },
  banner: {
    flex: .15,
    minHeight: 100
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  },
  schedule:{
   flex: .85
  },
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  link:{
    color: 'blue'
  }
});