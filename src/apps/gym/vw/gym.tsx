import { Image, StyleSheet, SafeAreaView, Text, View, ScrollView,Dimensions, Platform, PixelRatio, StatusBar } from "react-native";
import React, { useState } from 'react';
import { ListItem, Button } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import Header from "../../../utils/components/header";
import {normalize} from '../../../fileTextsizing';

import { general_gym_hours, gym_info, gym_info2, gym_rules, gym_dress_code, bg_default, bg_alt, accent3, title_light, accent2 } from '../../../utils/assets/data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};



export default function Gym(props: CompProps) {

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props} />

        <View style={styles.app_container}>
          <View style={styles.banner}>
            <Image
              source={require('../../../utils/assets/images/gymwall.jpg')}
              style={styles.banner_image} />
            <Text style={styles.main_title}>Falcon Fitness Center</Text>
          </View>

          <View style={styles.schedule}>
            <ScrollView>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={styles.bold_title}>Hours</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: [bg_default, bg_alt]
                }}
                ViewComponent={LinearGradient}
                containerStyle={styles.list_header}
                topDivider
                isExpanded={expanded1}
                onPress={() => {
                  setExpanded1(!expanded1);
                }}>
                {general_gym_hours.map((l, i) => (
                  <ListItem key={i} containerStyle={styles.list_item}>
                    <ListItem.Content>
                      <ListItem.Title style={styles.info}>{l.name}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </ListItem.Accordion>

              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={styles.bold_title}>Access</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: [bg_default, bg_alt]
                }}
                ViewComponent={LinearGradient}
                containerStyle={styles.list_header}
                topDivider
                isExpanded={expanded2}
                onPress={() => {
                  setExpanded2(!expanded2);
                }}>

                <ListItem >
                <ListItem.Content>
                  <Text style={styles.info}>{gym_info}</Text>
                  <Button
                    title="Activate Card"
                    buttonStyle={styles.button}
                    containerStyle={styles.button_container}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                      WebBrowser.openBrowserAsync("https://www.messiah.edu/a/sso/sso.php?url=https://ssb.messiah.edu/BANR/mc_bwsfacdgw.Fitness_Waiver")
                    }}
                  />
                  </ListItem.Content>
                </ListItem>

              </ListItem.Accordion>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={styles.bold_title}>Policies and Procedures</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: [bg_default, bg_alt]
                }}
                ViewComponent={LinearGradient}
                containerStyle={styles.list_header}
                topDivider
                isExpanded={expanded3}
                onPress={() => {
                  setExpanded3(!expanded3);
                }}>

                <ListItem >
                  <ListItem.Content>
                    <ListItem.Title style={styles.info}>{gym_info2}</ListItem.Title>

                    <ListItem.Title style={styles.bold_subtitle}>Fitness Center Rules:</ListItem.Title>
                    <ListItem.Title style={styles.info}>{gym_rules}</ListItem.Title>

                    <ListItem.Title style={styles.bold_subtitle}>Fitness Center Dress Code:</ListItem.Title>
                    <ListItem.Title style={styles.info}>{gym_dress_code}</ListItem.Title>


                  </ListItem.Content>
                </ListItem>

              </ListItem.Accordion>
            </ScrollView>
          </View>
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
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  banner_image_cont: {
    flex: 1
  },
  banner_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  main_title: {
    color: title_light,
    fontSize: normalize(30),
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
  schedule: {
    flex: .85
  },
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  info: {
    fontSize: normalize(13),
    marginHorizontal: 30,
    fontWeight: '300',
    lineHeight:  normalize(20)
  },
  list_item: {
    margin: 10,
    padding: 0,
    backgroundColor: null
  },
  bold_subtitle: {
    fontWeight: '600',
    fontSize: normalize(18),
    marginHorizontal: 18
  },
  button: {
    backgroundColor: accent2,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    height: 50,
  },
  button_container: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20
  },
  bold_title: {
    fontWeight: '600',
    fontSize: normalize(14),
    marginHorizontal: 18
  },
  
});
