import { Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import Header from "./header";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Gym(props: CompProps) {

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const general_gym_hours = [
    { name: 'Monday: 6am - 11pm' },
    { name: 'Tuesday: 6am - 11pm' },
    { name: 'Wednesday: 6am - 11pm' },
    { name: 'Thursday: 6am - 11pm' },
    { name: 'Friday: 6am - 8pm' },
    { name: 'Saturday: 8am - 8pm' },
    { name: 'Sunday: 1pm - 11pm' }
  ]


  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props} />

        <View style={styles.app_container}>
          <View style={styles.banner}>
            <Image
              source={require('../assets/images/gymwall.jpg')}
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
                    <ListItem.Title><Text>Access is free for Messiah University students,
                      employees, spouses of employees, and depedents of employees between
                      the ages of 16-18. You must bring your Messiah ID with you each time
                      you access the fitness center. Passing an ID card or using an ID card
                      other than your own may result in an up to two week suspension of fitness
                      center access. To activate your card, follow this </Text>
                      <Text style={styles.link} onPress={() => { WebBrowser.openBrowserAsync("https://www.messiah.edu/a/sso/sso.php?url=https://ssb.messiah.edu/BANR/mc_bwsfacdgw.Fitness_Waiver") }}>
                        link</Text><Text> to our waiver.</Text></ListItem.Title>
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
                    <ListItem.Title><Text>At Messiah University we have been blessed
                      with an amazing fitness center. As a community, it is now our
                      responsibility to keep this center, and equipment, in state of
                      the art condition. Take a moment to familiarize yourself with
                      the rules and policies of the Falcon Fitness Center. Exercising
                      here is a privilege, not a right; failing to follow any of
                      these rules may result in losing that privilege and further
                      discipline by the University                            </Text></ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                    <ListItem.Title style={styles.bold_subtitle}>Fitness Center Rules:</ListItem.Title>
                    <ListItem.Title >We strongly encourage members to follow CDC
                      masking guidlines Equipment must be sanitized before and after
                      use. In some areas paper towels and spray bottles have replaced
                      pre-wet wipes. Please make sure the paper towel is fully "soaked"
                      before using it to sanitize any and all equipment, before and after
                      use. All behaviors, attitudes, and policies outlined in the Messiah
                      University Student handbook and Community Covenant should be followed
                      at all times while in the fitness center.  All injuries should be
                      reported to the welcome desk immediately Damaged or broken equipment
                      must be reported to a student worker or the director immediately Signs
                      and instructions specific to each location are conveniently placed around
                      the fitness center. Follow all instructions and guidelines on signs
                      and posters.</ListItem.Title>
                    <ListItem.Title style={styles.bold_subtitle}> </ListItem.Title>

                    <ListItem.Title style={styles.bold_subtitle}>Fitness Center Dress Code:</ListItem.Title>
                    <ListItem.Title >All dress code policies outlined in the Messiah University
                      Student Handbook must be followed while in the fitness center. Shirts and
                      closed toe shoes are required at all times. Sandals or open toe shoes are
                      not permitted. Jeans, Jean shorts, belts or any other clothing with metal
                      objects are not permitted. On poor weather days bring a separate pair of
                      shoes.</ListItem.Title>


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
