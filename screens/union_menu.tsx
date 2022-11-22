import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import Header from "./header";

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

  // Each menu category has items listed here
  const ice_cream_list = [
    'ice cream',
    'ice cream'
  ]
  const sandwich_list = [
    'ice cream',
    'ice cream'
  ]
  const burger_list = [
    'ice cream',
    'ice cream'
  ]
  const coffee_tea_list = [
    'ice cream',
    'ice cream'
  ]
  const pizza_list = [
    'ice cream',
    'ice cream'
  ]
  const u_create_list = [
    'ice cream',
    'ice cream'
  ]

  const menu_list = [
    { name: "Ice Cream", items: ice_cream_list },
    { name: "Sandwiches", items: sandwich_list },
    { name: "Burgers", items: burger_list },
    { name: "Coffee & Tea", items: coffee_tea_list },
    { name: "Pizza", items: pizza_list },
    { name: "U-CREATE", items: u_create_list }
  ]

  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props} />

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlay_container}>
          <Text style={styles.overlay_heading}>Monday - Friday</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.overlay_subtitle}>Breakfast</Text>
              <Text style={styles.overlay_subtitle}>Lunch</Text>
              <Text style={styles.overlay_subtitle}>Dinner</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <Text style={styles.overlay_times}>7:00 - 9:00</Text>
              <Text style={styles.overlay_times}>11:00 - 2:00</Text>
              <Text style={styles.overlay_times}>4:30 - 7:30</Text>
            </View>
          </View>
          <Text style={styles.overlay_heading}>Saturday - Sunday</Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.overlay_subtitle}>Brunch</Text>
              <Text style={styles.overlay_subtitle}>Dinner</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <Text style={styles.overlay_times}>9:00 - 2:00</Text>
              <Text style={styles.overlay_times}>4:30 - 7:30</Text>
            </View>
          </View>
        </Overlay>

        <View style={styles.app_container}>
          <Text style={styles.title}>Union Cafe Menu</Text>
          <Button
            title="Hours of Operation"
            buttonStyle={styles.button1}
            titleStyle={{ fontSize: 18 }}
            onPress={toggleOverlay}
          />
          <ScrollView>
            {menu_list.map((category, i) =>
              <ListItem.Accordion
                key={i}
                content={
                  <ListItem.Content>
                    <ListItem.Title>{category.name}</ListItem.Title>
                  </ListItem.Content>
                }
                linearGradientProps={{
                  colors: ['#FBFBFB', '#F3F3F3']
                }}
                ViewComponent={LinearGradient}
                containerStyle={styles.list_header}
                topDivider
                isExpanded={expandedList[i]}
                onPress={() => {
                  setExpandedList([...expandedList.slice(0, i), !expandedList[i], ...expandedList.slice(i + 1, expandedList.length)]);
                }}>
                {category.items.map((item, j) => (
                  <ListItem key={j}>
                    <ListItem.Content>
                      <ListItem.Title>{item}</ListItem.Title>
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
            titleStyle={{ fontSize: 18 }}
            onPress={_handlePressButtonAsync}
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
  page: {
    backgroundColor: '#1E293B',
    flex: 1
  },
  subtitle: {
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 36,
    fontWeight: '600',
    padding: 30
  },
  button1: {
    backgroundColor: '#5EBD4E',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
    height: 50,
    marginBottom: 30
  },
  button2: {
    backgroundColor: '#1E293B',
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
  overlay_container: {
    width: 300,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  overlay_heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6D6868',
    paddingVertical: 10
  },
  overlay_subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#968C8C'
  },
  overlay_times: {
    fontSize: 18,
    fontWeight: '500',
    color: '#968C8C'
  }
});
