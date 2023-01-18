import { StyleSheet, SafeAreaView, Text, View, ScrollView, Platform, StatusBar } from "react-native";
import React, { useState } from 'react';
import { Button, Overlay, ListItem } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../../../utils/components/header";
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { accent1, accent1_alt, accent2, accent3, accent4, bg_alt, bg_default, title_dark, title_light, title_mid } from '../../../utils/assets/data'

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function LottieMenu(props: CompProps) {

  var today = new Date().toISOString().substring(0, 10);

  // For overlay
  const [visible, setVisible] = useState(false);
  // Each drop-down menu needs a set of bool values
  const [expandedList, setExpandedList] = useState([false]);

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

  let Breakfast = [
    { key: "Breakfast Entrees", value: BreakfastEntrees },
    { key: "Messiah Bakery", value: MessiahBakery }
  ]

  let Lunch = [
    { key: "Entree Line 1", value: EntreeLine1 },
    { key: "Entree Line 2", value: EntreeLine2 },
    { key: "Breakfast Entrees", value: BreakfastEntrees }
  ]

  let Dinner = [
    { key: "Entree Line 2", value: EntreeLine2 },
    { key: "Breakfast Entrees", value: BreakfastEntrees },
    { key: "Entree Line 1", value: EntreeLine1 }]

  let Brunch = [
    { key: "Breakfast Entrees", value: BreakfastEntrees },
    { key: "Entree Line 1", value: EntreeLine1 }]

  let thisDay = [
    { key: "Breakfast", value: Breakfast },
    { key: "Lunch", value: Lunch },
    { key: "Dinner", value: Dinner }
  ]

  return (
    <>
      <SafeAreaView style={styles.page}>

        <Header props={props}/>

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
              {thisDay.map((meal, i) =>
                <ListItem.Accordion
                  key={i}
                  content={
                    <ListItem.Content>
                      <ListItem.Title>{meal.key}</ListItem.Title>
                    </ListItem.Content>
                  }
                  linearGradientProps={{
                    colors: [bg_default, bg_alt]
                  }}
                  ViewComponent={LinearGradient}
                  containerStyle={styles.list_header}
                  topDivider
                  onPress={() => {
                    setExpandedList([...expandedList.slice(0, i), !expandedList[i], ...expandedList.slice(i + 1, expandedList.length)]);
                  }}
                  isExpanded={expandedList[i]}>
                  {meal.value.map((category, j) =>
                    <ListItem key={j}>
                      <ListItem.Content>
                        <>
                          <ListItem.Title>{category.key}</ListItem.Title>
                          {category.value.map((food, k) =>
                            <ListItem.Subtitle key={k}>{food}</ListItem.Subtitle>
                          )}
                        </>
                      </ListItem.Content>
                    </ListItem>
                  )}
                </ListItem.Accordion>
              )}
            </>
          </ScrollView>
        </View>
      </SafeAreaView>
      <LinearGradient
        colors={[accent1, accent1_alt]}
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
                textSectionTitleColor: title_light,
                selectedDayBackgroundColor: accent3,
                selectedDayTextColor: title_light,
                todayTextColor: title_light,
                todayDotColor: title_light,
                dayTextColor: title_light,
                textDisabledColor: '#97BEE1'
              }}
              markedDates={{
                [today]: { marked: true, dotColor: title_light }
              }}
              onDayPress={(day) => console.log(day)}
              firstDay={0}
              disableAllTouchEventsForDisabledDays={false}
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
  list_header: {
    height: 70,
    justifyContent: 'center'
  },
  overlay_container: {
    width: 300,
    borderRadius: 20,
    backgroundColor: bg_default,
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  overlay_heading: {
    fontSize: 22,
    fontWeight: '600',
    color: title_mid,
    paddingVertical: 10
  },
  overlay_subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: title_mid
  },
  overlay_times: {
    fontSize: 18,
    fontWeight: '500',
    color: title_mid
  },
  calendarBackground: {
    flex: 0.15,
    backgroundColor: null
  }
});