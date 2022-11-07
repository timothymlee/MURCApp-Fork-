import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem, CheckBox } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; goBack: Function; };
};

export default function Allergies(props: CompProps) {

  // Set to true if they say they have an allergy
  const [checked1, setChecked1] = React.useState(false); // Dairy
  const [checked2, setChecked2] = React.useState(false); // Egg
  const [checked3, setChecked3] = React.useState(false); // Fish
  const [checked4, setChecked4] = React.useState(false); // Shellfish
  const [checked5, setChecked5] = React.useState(false); // Peanuts
  const [checked6, setChecked6] = React.useState(false); // Tree Nuts
  const [checked7, setChecked7] = React.useState(false); // Gluten
  const [checked8, setChecked8] = React.useState(false); // Vegan

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
            <Image source={require('../assets/images/messiah_logo.png')} style={styles.header_image} />
          </View>
          <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
        </View>

        <View style={styles.app_container}>
          <Pressable style={styles.backButtonContainer} onPress={() => props.navigation.goBack()}>
            <Icon name="chevron-back" type="ionicon" size={28} color={'black'}></Icon>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Back</Text>
          </Pressable>
          <Text style={styles.title}>Allergies</Text>
          <ScrollView style={styles.checkBoxesContainer}>
            <CheckBox
              checked={checked1}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: '#EDEDED', margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked1(!checked1)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Dairy"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked2}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: null, margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked2(!checked2)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Egg"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked3}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: '#EDEDED', margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked3(!checked3)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Fish"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked4}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: null, margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked4(!checked4)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Shellfish"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked5}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: '#EDEDED', margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked5(!checked5)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Peanuts"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked6}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: null, margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked6(!checked6)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Tree Nuts"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked7}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: '#EDEDED', margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked7(!checked7)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Gluten"
              uncheckedColor="#838383"
            />
            <CheckBox
              checked={checked8}
              checkedColor="#0F0"
              containerStyle={{ width: "100%", padding: 12, backgroundColor: null, margin: 0, marginLeft: 0}}
              iconRight
              onIconPress={() => setChecked8(!checked8)}
              size={32}
              textStyle={{fontWeight: '400', fontSize: 16, paddingLeft: '8%'}}
              title="Vegan"
              uncheckedColor="#838383"
            />
            <View style={{height: 100}}></View>
          </ScrollView>
          <Button
            title="Save Changes"
            buttonStyle={styles.button}
            containerStyle={styles.button_container}
            titleStyle={{ fontSize: 18 }}
            // onPress will save state of the current checked boxes in the database
            onPress={() => props.navigation.navigate('Home')}
          />
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
  header_content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  header_icons: {
    color: 'white'
  },
  subtitle: {
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 28,
    fontWeight: '600',
    paddingLeft: 30,
    paddingBottom: 20
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  },
  button: {
    backgroundColor: '#5EBD4E',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    height: 50,
  },
  button_container: {
    bottom: 0,
    position: 'absolute',
    marginBottom: 30,
    width: '85%',
    alignSelf: 'center'
  },
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  overlay_container: {
    width: 300,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  backButtonContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  checkBoxesContainer: {

  }
});
