import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView, TextInput, Alert} from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem, Slider } from "@rneui/themed";
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import {writeReport} from '../src/reportingCalls';

const name = "Ricardo Padilla"
const email = "rp1288@messiah.edu"
const category = "harassment"


type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Reporting(props: CompProps) {
    const [message, setMessage] = useState(' ');
    const [messagePlaceHolder, setMessagePlaceHolder] = useState('Enter a Message');

    function press(){
        props.navigation.navigate('Home')
        alert(writeReport(category,message,name,email));
        
    }
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
          <View style={styles.banner}>
            <Image
              source={require('../assets/images/gymwall.jpg')}
              style={styles.banner_image} />
            <Text style={styles.main_title}>Security Report</Text>
          </View>
          
          <View style={styles.schedule}>
            <Text style={styles.title}>Message</Text>
                <View style={styles.center}>
                    <View
                            style={{
                            backgroundColor: '#D3D3D3',
                            borderColor: '#000000',
                            borderWidth: 1,
                            width:'90%',
                            padding:5,
                            marginBottom:"5%"
                            
                        
                        }}>
                        <TextInput
                        placeholder= {messagePlaceHolder}
                        multiline
                        onChangeText={(val)=> setMessage(val)}
                        />  
                    </View>
                    
                </View>
                <View style={[{ alignItems: 'center' }]}>
                    <View style={[styles.button]}>
                        <Button onPress={()=>press()}>Send</Button>
                    </View>
                </View>
                
                
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
  button: {
    width: '85%'
  },
  center: {
    alignItems: 'center',    
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
    fontSize: 36,
    fontWeight: '600',
    position: 'absolute',
    padding: 20,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    bottom: 0
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
