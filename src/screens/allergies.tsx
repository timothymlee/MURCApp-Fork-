import { Pressable, StyleSheet, SafeAreaView, Text, View, ScrollView, Platform, StatusBar } from "react-native";
import React from 'react';
import { Icon, Button, CheckBox } from "@rneui/themed";
import Header from "./Components/header"
import {normalize} from '../fileTextsizing';
import {writeUserPreferences} from '../firebaseCalls';
import { icon_dark, title_dark, bg_default, bg_alt, accent2, title_mid, accent3, title_light } from '../assets/data'

const userId = 1399154;

import BackButton from "./Components/backButton";
type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; goBack: Function; };
};

export default function Allergies(props: CompProps) {

  // Set to true if they say they have an allergy
  let allergyPreferences: boolean[] = [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]

  const [checked1, setChecked1] = React.useState(allergyPreferences[0]); // Dairy
  const [checked2, setChecked2] = React.useState(allergyPreferences[1]); // Egg
  const [checked3, setChecked3] = React.useState(allergyPreferences[2]); // Fish
  const [checked4, setChecked4] = React.useState(allergyPreferences[3]); // Shellfish
  const [checked5, setChecked5] = React.useState(allergyPreferences[4]); // Peanuts
  const [checked6, setChecked6] = React.useState(allergyPreferences[5]); // Tree Nuts
  const [checked7, setChecked7] = React.useState(allergyPreferences[6]); // Gluten
  const [checked8, setChecked8] = React.useState(allergyPreferences[7]); // Vegan

  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props}/>

        <View style={styles.app_container}>
          <Text style={styles.title}>Dietary Preferences</Text>
          <Text style={styles.subtitle}>This information will only be used when placing an online order</Text>
          <ScrollView>
            <View style={styles.checkboxItemContainer1}>
              <Text style={styles.checkboxText}>No Dairy</Text>
              <CheckBox
                checked={checked1}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked1(!checked1)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer2}>
              <Text style={styles.checkboxText}>No Egg</Text>
              <CheckBox
                checked={checked2}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked2(!checked2)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer1}>
              <Text style={styles.checkboxText}>No Fish</Text>
              <CheckBox
                checked={checked3}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked3(!checked3)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer2}>
              <Text style={styles.checkboxText}>No Shellfish</Text>
              <CheckBox
                checked={checked4}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked4(!checked4)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer1}>
              <Text style={styles.checkboxText}>No Peanuts</Text>
              <CheckBox
                checked={checked5}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked5(!checked5)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer2}>
              <Text style={styles.checkboxText}>No Tree Nuts</Text>
              <CheckBox
                checked={checked6}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked6(!checked6)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer1}>
              <Text style={styles.checkboxText}>No Gluten</Text>
              <CheckBox
                checked={checked7}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked7(!checked7)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={styles.checkboxItemContainer2}>
              <Text style={styles.checkboxText}>Vegan</Text>
              <CheckBox
                checked={checked8}
                checkedColor={accent2}
                containerStyle={styles.checkboxBoxContainer}
                onIconPress={() => setChecked8(!checked8)}
                size={normalize(32)}
                uncheckedColor={title_mid}
              />
            </View>
            <View style={{ height: normalize(100) }}></View>
          </ScrollView>
          <Button
            title="Save Changes"
            buttonStyle={styles.button}
            containerStyle={styles.button_container}
            titleStyle={{ fontSize: normalize(18), color: title_light }}
            // onPress will save state of the current checked boxes in the database
            onPress={() => {
              allergyPreferences[0] = checked1;
              allergyPreferences[1] = checked2;
              allergyPreferences[2] = checked3;
              allergyPreferences[3] = checked4;
              allergyPreferences[4] = checked5;
              allergyPreferences[5] = checked6;
              allergyPreferences[6] = checked7;
              allergyPreferences[7] = checked8;
              writeUserPreferences(userId, allergyPreferences);

            }}
          />
          <BackButton props={props} iconColor={icon_dark}/>
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
  subtitle: {
    color: title_dark,
    paddingLeft: normalize(30),
    paddingBottom: normalize(20),
    fontSize: normalize(12)
  },
  title: {
    color: title_dark,
    fontSize: normalize(28),
    fontWeight: '600',
    paddingLeft: normalize(30),
    paddingBottom: normalize(10),
    paddingTop: normalize(50)
  },
  button: {
    backgroundColor: accent2,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    height: normalize(50),
  },
  button_container: {
    bottom: 0,
    position: 'absolute',
    marginBottom: normalize(30),
    width: '85%',
    alignSelf: 'center'
  },
  list_header: {
    height: normalize(70),
    justifyContent: 'center'
  },
  checkboxItemContainer1: {
    flexDirection: 'row',
    backgroundColor: bg_alt,
    margin: 0,
    marginLeft: 0,
    alignItems: 'center',
    paddingHorizontal: normalize(40),
    paddingVertical: normalize(12)
  },
  checkboxItemContainer2: {
    flexDirection: 'row',
    backgroundColor: null,
    margin: 0,
    marginLeft: 0,
    alignItems: 'center',
    paddingHorizontal: normalize(40),
    paddingVertical: normalize(12)
  },
  checkboxText: {
    flex: 1,
    fontWeight: '400',
    fontSize: normalize(16),
    padding: 0
  },
  checkboxBoxContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: null,
    padding: 0,
    margin: 0,
    marginRight: 0
  }
});
