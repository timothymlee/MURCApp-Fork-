import { Image, StyleSheet, SafeAreaView, Text, View } from "react-native";
import React from 'react';
import { Slider } from "@rneui/themed";
import Header from "../../../utils/components/header";
import { selectAuth } from "../../../api/authSlice";
import { useAppSelector } from '../../../app/hooks';
import {useDataMutation} from '../../../api/apiSlice'
import { bg_default, accent4, title_dark, title_light, accent1, accent3} from '../../../utils/assets/data'

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
              source={require("../../../utils/assets/images/Hostetter_Chapel-1.jpeg")}
              style={styles.banner_image} />
            <Text style={styles.main_title}>Chapel Attendance</Text>
          </View>
          
          <View style={{ flex: 3, minHeight: 80 }}>
            <View style={styles.progress_container}>
              <Slider
                disabled
                maximumTrackTintColor={bg_default}
                maximumValue={required}
                minimumTrackTintColor={accent1}
                minimumValue={0}
                orientation="horizontal"
                step={1}
                style={{ width: "90%" }}
                thumbTintColor="null"
                trackStyle={{
                  height: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: accent4
                }}
                value={attended}
              />
            </View>

            <View style={styles.info_block}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Chapels Attended</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Chapels Required</Text>
              </View>
            </View>
            <View style={styles.info_block}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{attended}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{required}</Text>
              </View>
            </View>
            <View style={styles.info_block}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Chapel Adjustment</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={styles.subtitle}>Remaining Chapels</Text>
              </View>
            </View>
            <View style={styles.info_block}>
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
    backgroundColor: bg_default,
    flex: 1
  },
  page: {
    backgroundColor: accent3,
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
    color: title_dark
  },
  title: {
    color: title_dark,
    fontSize: 40,
    fontWeight: '700'
  },
  main_title: {
    color: title_light,
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
  },
  info_block: {
    flex: 0.5, 
    flexDirection: 'row', 
    paddingHorizontal: 20
  }
});
