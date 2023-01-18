import { StyleSheet, SafeAreaView, Text, View, ScrollView, Platform, StatusBar } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import Header from "./Components/header";
import {normalize} from '../fileTextsizing';

import { accent2, accent3, bg_alt, bg_default, union_menu_list, title_dark, title_mid } from '../assets/data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function UnionMenu(props: CompProps) {
  // For linking to the Union site
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://union.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };

  // For overlay
  const [visible, setVisible] = useState(false);

  const [expandedList, setExpandedList] = useState([false]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props} />

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlay_container}>
          <Text style={styles.overlay_heading}>Monday - Friday</Text>
          <View>
            <Text style={styles.overlay_times}>7:30 am - 11:00 pm</Text>
          </View>
          <Text style={styles.overlay_heading}>Saturday - Sunday</Text>
          <View>
            <Text style={styles.overlay_times}>11:00 am - 11:00 pm</Text>
          </View>

        </Overlay>

        <View style={styles.app_container}>
          <Text style={styles.title}>Union Cafe Menu</Text>
          <Button
            title="Hours of Operation"
            buttonStyle={styles.button1}
            titleStyle={{ fontSize: normalize(13) }}
            onPress={toggleOverlay}
          />
          <ScrollView>
            {union_menu_list.map((category, i) =>
              <ListItem.Accordion
                key={i}
                content={
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: normalize(12), fontWeight: '600' }}>{category.name}</ListItem.Title>
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
                      <View style={{flexDirection: 'row', flex: 1, width: "100%"}}>
                        <ListItem.Title style={styles.item_text}>{item.name}</ListItem.Title>
                        <ListItem.Title style={styles.price_text}>${item.price}</ListItem.Title>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </ListItem.Accordion>
            )}
            <View style={{ height: 100 }}></View>

          </ScrollView>
          <Button
            title="Order Now"
            buttonStyle={styles.button2}
            containerStyle={styles.button2_container}
            titleStyle={{ fontSize: normalize(13) }}
            onPress={_handlePressButtonAsync}
          />
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
  title: {
    color: title_dark,
    fontSize: normalize(26),
    fontWeight: '600',
    padding: normalize(20)
  },
  button1: {
    backgroundColor: accent2,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
    height: normalize(30),
    marginBottom: normalize(30)
  },
  button2: {
    backgroundColor: accent3,
    width: '100%',
    borderRadius: 30,
    height: normalize(30)
  },
  button2_container: {
    bottom: 0,
    position: 'absolute',
    marginBottom: normalize(30),
    width: '85%',
    alignSelf: 'center'
  },
  list_header: {
    height: normalize(40),
    
    justifyContent: 'center'
  },
  overlay_container: {
    width: normalize(200),
    borderRadius: 20,
    backgroundColor: bg_default,
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(15),
    justifyContent: 'center'
  },
  overlay_heading: {
    fontSize: normalize(16),
    fontWeight: '600',
    color: title_mid,
    paddingVertical: normalize(10)
  },
  overlay_times: {
    alignSelf: 'center',
    fontSize: normalize(14),
    fontWeight: '500',
    color: title_mid
  },
  item_text: {
    fontSize: normalize(13),
    flex: 3,
    marginLeft: normalize(30),
    fontWeight: '300',
  },
  price_text: {
    fontSize: normalize(13),
    flex: 1,
    marginRight: normalize(30),
    fontWeight: '300',
  },
  list_item: {
    margin: normalize(10),
    padding: 0,
    backgroundColor: null
  },
});
