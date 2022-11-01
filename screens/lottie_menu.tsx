import { Pressable, Image, StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import { Icon, Button, Overlay, ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function LottieMenu(props: CompProps) {
  // For linking to the Union site
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://union.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };

  var today = new Date().toISOString().substring(0, 10);

  // For overlay
  const [visible, setVisible] = useState(false);
  // Each drop-down menu needs a set of bool values
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let BreakfastEntrees: string[] = [
    'Turkey Bacon',
    'Scrambled Eggs',
    'Chocolate Chip Pancakes',
    'Hash Browns Supreme'
  ]

  let MessiahBakery: string[] = [
    "Baker's Choice"
  ]

  let EntreeLine1: string[] = [
    'Waffle Fries',
    'Crab Stuffed Mushroom Cap',
    'Kaiser Roll',
    'Falcon Fil-et Sauce',
    'Falcon Fil-et Sandwich'
  ]

  let EntreeLine2: string[] = [
    'Corn Pudding Casserole',
    'Turkey Noodle Casserole',
    'Sour Cream',
    'Apple Sauce'
  ]

  let Breakfast = { "Breakfast Entrees": BreakfastEntrees, "Messiah Bakery": MessiahBakery }

  let Lunch = { "Entree Line 1": EntreeLine1, "Entree Line 2": EntreeLine2, "Breakfast Entrees": BreakfastEntrees }

  let Dinner = { "Entree Line 2": EntreeLine2, "Breakfast Entrees": BreakfastEntrees, "Entree Line 1": EntreeLine1 }

  let Brunch = { "Breakfast Entrees": BreakfastEntrees, "Entree Line 1": EntreeLine1 }

  let thisDay = {
    "Breakfast": Breakfast,
    "Lunch": Lunch,
    "Dinner": Dinner
  }

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
          <Text style={styles.title}>Lottie Menu</Text>
          <Button
            title="Hours of Operation"
            buttonStyle={styles.button1}
            titleStyle={{ fontSize: 18 }}
            onPress={toggleOverlay}
          />
          <ScrollView>
            <>
            {Object.entries(thisDay).forEach(([meal, categoryType]) => {
              console.log(meal);
                <ListItem.Accordion
                  content={
                    <ListItem.Content>
                      <ListItem.Title>{meal}</ListItem.Title>
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
                  {Object.entries(categoryType).forEach(([categoryTitle, foodList]) => {
                    console.log("-" + categoryTitle);
                    <ListItem>
                      <ListItem.Content>
                        <>
                          <ListItem.Title>{categoryTitle}</ListItem.Title>
                          {foodList.forEach(function (food) {
                            console.log("--" + food);
                            <ListItem.Subtitle>{food}</ListItem.Subtitle>
                          })}
                        </>
                      </ListItem.Content>
                    </ListItem>
                  })}
                </ListItem.Accordion>
                console.log("------------");
              })}
            </>        
          </ScrollView>
        </View>
      </SafeAreaView>
      <LinearGradient
        colors={['#5DAEF8', '#4D8FCC']}
        style={styles.calendarBackground}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: null }}>
          <CalendarProvider
            date={today}
            style={{ backgroundColor: null }}>
            <WeekCalendar
              // Documentation: 
              // https://www.npmjs.com/package/react-native-calendars?activeTab=readme
              // https://wix.github.io/react-native-calendars/docs/CalendarProvider
              // https://wix.github.io/react-native-calendars/docs/WeekCalendar
              style={{ backgroundColor: null }}
              theme={{
                calendarBackground: null,
                todayBackgroundColor: null,
                textSectionTitleColor: '#ffffff',
                selectedDayBackgroundColor: '#1E293B',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#ffffff',
                todayDotColor: '#ffffff',
                dayTextColor: '#ffffff',
                textDisabledColor: '#97BEE1'
              }}
              markedDates={{
                today: { marked: true, dotColor: 'white' },
              }}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              //minDate={'2022-08-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              //maxDate={'2022-12-22'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => console.log(day)}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              firstDay={0}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={false}
              // Enable the option to swipe between months. Default = false
              enableSwipeMonths={true}
            />
          </CalendarProvider>
        </SafeAreaView>
      </LinearGradient>

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
    fontSize: 36,
    fontWeight: '600',
    padding: 30
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
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
  },
  calendarBackground: {
    flex: 0.15,
    backgroundColor: null
  }
});