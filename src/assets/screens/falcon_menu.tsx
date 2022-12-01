import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Button, ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import Header from "./Components/header";
import { accent2, bg_alt, falcon_menu_list, accent3, bg_default, title_dark, title_light } from '../data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function FalconMenu(props: CompProps) {

  // For linking to the Union site
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://falcon.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };
  const [expandedList, setExpandedList] = useState([false]);

  return (
    <SafeAreaView style={styles.page}>

      <Header props={props} />

      <View style={styles.app_container}>
        <Text style={styles.title}>Falcon Menu</Text>
        <View style={styles.hours_container}>
          <Text style={styles.hours_heading}>Hours of Operation</Text>
          <Text style={styles.hours_subtitle}>Monday - Friday</Text>
          <Text style={styles.hours_times}>7:30 - 3:30</Text>
        </View>
        <ScrollView>
          <>
            {falcon_menu_list.map((category, i) =>
              <ListItem.Accordion
                key={i}
                content={
                  <ListItem.Content>
                    <ListItem.Title>{category.name}</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: [bg_default, bg_alt]
                }}
                ViewComponent={LinearGradient}
                containerStyle={styles.list_header}
                topDivider
                isExpanded={expandedList[i]}
                onPress={() => {
                  setExpandedList([...expandedList.slice(0, i), !expandedList[i], ...expandedList.slice(i + 1, expandedList.length)]);
                }}>
                {category.items.map((item, j) => (
                  <ListItem key={j} containerStyle={styles.list_item}>
                    <ListItem.Content>
                      <View style={{ flexDirection: 'row', flex: 1, width: "100%" }}>
                        <ListItem.Title style={styles.item_text}>{item.name}</ListItem.Title>
                        <ListItem.Title style={styles.price_text}>${item.price}</ListItem.Title>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </ListItem.Accordion>
            )}
            <View style={{ height: 100 }}></View>
          </>
        </ScrollView>
        <Button
          title="Order Now"
          buttonStyle={styles.button2}
          containerStyle={styles.button2_container}
          titleStyle={{ fontSize: 18 }}
          onPress={_handlePressButtonAsync}
        />
      </View>

    </SafeAreaView>
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
  subtitle: {
    color: title_dark
  },
  title: {
    color: title_dark,
    fontSize: 36,
    fontWeight: '600',
    padding: 30
  },
  button1: {
    backgroundColor: accent2,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
    height: 50,
    marginBottom: 30
  },
  button2: {
    backgroundColor: accent3,
    width: '100%',
    borderRadius: 30,
    height: 50
  },
  button2_container: {
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
  hours_heading: {
    fontSize: 22,
    fontWeight: '600',
    color: title_light
  },
  hours_subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: bg_alt
  },
  hours_times: {
    fontSize: 18,
    fontWeight: '500',
    color: bg_alt
  },
  hours_container: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: accent2
  },
  item_text: {
    fontSize: 13,
    flex: 3,
    marginLeft: 30,
    fontWeight: '300',
  },
  price_text: {
    fontSize: 13,
    flex: 1,
    marginRight: 30,
    fontWeight: '300',
  },
  list_item: {
    margin: 10,
    padding: 0,
    backgroundColor: null
  },
});
