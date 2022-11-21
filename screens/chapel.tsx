import { Image, StyleSheet, SafeAreaView, Text, View } from "react-native";
import React from 'react';
import { Slider } from "@rneui/themed";
import Header from "./header";
import { selectAuth } from "../src/api/authSlice";
import { useAppSelector } from '../src/app/hooks';
import {useDataMutation} from '../src/api/apiSlice'

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Chapel(props: CompProps) {

  var attended = 6;
  var adjustment = 0;
  var required = 14;
  var remaining = required - attended - adjustment;

  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props}/>

        <View style={styles.app_container}>
          <View style={styles.banner}>
            <Image
              source={require('../assets/images/Hostetter_Chapel-1.jpeg')}
              style={styles.banner_image} />
            <Text style={styles.main_title}>Chapel Attendance</Text>
          </View>
          
          <View style={{ flex: 3, minHeight: 80 }}>
            <View style={styles.progress_container}>
              <Slider
                disabled
                maximumTrackTintColor="#fff"
                maximumValue={required}
                minimumTrackTintColor="#6EB3F2"
                minimumValue={0}
                orientation="horizontal"
                step={1}
                style={{ width: "90%" }}
                thumbTintColor="null"
                trackStyle={{
                  height: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#B8B8B8"
                }}
                value={attended}
              />
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
                <Text style={styles.title}>{attended}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{required}</Text>
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
                <Text style={styles.title}>{adjustment}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{remaining}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 3 }}></View>
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
  page: {
    backgroundColor: '#1E293B',
    flex: 1
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
    fontSize: 40,
    fontWeight: '700'
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
    flex: 1,
    minHeight: 100
  }
});
