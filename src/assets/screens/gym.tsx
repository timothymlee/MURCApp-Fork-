import { Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import Header from "./Components/header";
import { general_gym_hours, gym_info, gym_info2, gym_rules, gym_dress_code } from '../data';

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
              source={require('../images/gymwall.jpg')}
              style={styles.banner_image} />
            <Text style={styles.main_title}>Falcon Fitness Center</Text>
          </View>

          <View style={styles.schedule}>
            <ScrollView>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title>Hours</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: ['#FBFBFB', '#F3F3F3']
                }}
                ViewComponent={LinearGradient}
                containerStyle={styles.list_header}
                topDivider
                isExpanded={expanded1}
                onPress={() => {
                  setExpanded1(!expanded1);
                }}>
                {general_gym_hours.map((l, i) => (
                  <ListItem key={i}>
                    <ListItem.Content>
                      <ListItem.Title>{l.name}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </ListItem.Accordion>

              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title>Access</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: ['#FBFBFB', '#F3F3F3']
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
                    <ListItem.Title><Text>{gym_info} </Text>
                      <Text style={styles.link} onPress={() => { WebBrowser.openBrowserAsync("https://www.messiah.edu/a/sso/sso.php?url=https://ssb.messiah.edu/BANR/mc_bwsfacdgw.Fitness_Waiver") }}>
                        Link</Text></ListItem.Title>
                  </ListItem.Content>
                </ListItem>

              </ListItem.Accordion>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title>Policies and Procedures</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: ['#FBFBFB', '#F3F3F3']
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
                    <ListItem.Title><Text>{gym_info2}</Text></ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                    <ListItem.Title style={styles.bold_subtitle}>Fitness Center Rules:</ListItem.Title>
                    <ListItem.Title >{gym_rules}</ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                    <ListItem.Title style={styles.bold_subtitle}>Fitness Center Dress Code:</ListItem.Title>
                    <ListItem.Title >{gym_dress_code}</ListItem.Title>


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
    backgroundColor: '#FBFBFB',
    flex: 1
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1
  },
  bold_subtitle: {
    fontWeight: '600',
    fontSize: 18,
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
  schedule: {
    flex: .85
  },
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  link: {
    color: 'blue'
  }
});
