import { StyleSheet,ImageBackground, View, Image, SafeAreaView, Text, ScrollView, KeyboardAvoidingView, Keyboard, Pressable, Platform, StatusBar } from "react-native";
import React, { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon, CheckBox } from "@rneui/themed";
import AnimatedInput from "react-native-animated-input";
import { color, renderNode } from "@rneui/base";
import {readEventData} from '../../../firebaseCalls';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';


const todaysDate = ((new Date().getFullYear().toLocaleString()) + '-' + (new Date().getMonth() + 1).toLocaleString()) + '-' + (new Date().getDate().toLocaleString())
let DataState = false;
let todaysEvent = null;
let tempdate = todaysDate;
let selectedDate = tempdate.replace(',','')
type CompProps = {
  navigation: { navigate: Function; };
};

//let str = selectedDate.substring(0, pos) + chr + selectedDate.substring(pos, selectedDate.length);

//generates the date formate that the calandar takes from the database formate
function dateCal(data) {
  const myArray = data.split("-");
  let year = myArray[0];
  let month = ("0" + myArray[1]).slice(-2)
  let day = ("0" + myArray[2]).slice(-2)
  let date = year + '-' + month + '-' + day;
  return date;
}

let today = new Date().toISOString().substring(0, 10);

//This gets the merged date and time and separates the date then converts it from mmddyyyy to mm-dd-yyyy for both the starting time&date and the ending time&date 
//then formats it into a string mm-dd-yyyy to mm-dd-yyyy.
function date(data) {
  let gendate;
  if (data.dateTimeStart.substr(0, 10) == data.dateTimeEnd.substr(0, 10)) {
    let year = (data.dateTimeStart).substr(0, 4);
    let month = (data.dateTimeStart).substr(5, 2);
    let day = (((data.dateTimeStart).substr(8, 2)).substr(0, 1)).replace("0", "") + ((data.dateTimeStart).substr(8, 3)).substr(1, 1);
    gendate = month + '-' + day + '-' + year;
  }
  if (data.dateTimeStart.substr(0, 10) != data.dateTimeEnd.substr(0, 10)) {
    let year = (data.dateTimeStart).substr(0, 4);
    let month = (data.dateTimeStart).substr(5, 2);
    let day = (((data.dateTimeStart).substr(8, 2)).substr(0, 1)).replace("0", "") + ((data.dateTimeStart).substr(8, 3)).substr(1, 1);
    let start = month + '-' + day + '-' + year;

    let year2 = (data.dateTimeEnd).substr(0, 4);
    let month2 = (data.dateTimeEnd).substr(5, 2);
    let day2 = (((data.dateTimeEnd).substr(8, 2)).substr(0, 1)).replace("0", "") + ((data.dateTimeEnd).substr(8, 3)).substr(1, 1);
    let end = month2 + '-' + day2 + '-' + year2;

    gendate = start + ' to ' + end

  }

  return gendate;

}


// this get the mergered time and date and gets the time which is in military time and converts it to standard time format.
function time(data) {
  let time;
  let hour = (data).substr(11, 2);

  let minute = (data).substr(14, 2);
  if (parseInt(hour) > 12) {
    time = (parseInt(hour) - 12) + ':' + minute + " PM"
  } else {

    let hour1 = ((hour).substr(0, 1)).replace("0", "") + ((hour).substr(1, 2));
    time = hour1 + ':' + minute + ' AM'
  }
  return time;
}


let trigger = true;
export default function TestPage(props: CompProps) {
  //This created the page state which by defualt is set to show a loading gif 
  //until the page state is changed.

  let todaysEvent = null;
  const [page, setPage] = useState(<View style={{ borderColor: 'black', width: '100%', height: '100%', justifyContent: "center", backgroundColor: "#ffffff", alignItems: "center" }}><Image source={require('../../utils/assets/images/loading.gif')} /></View>);
  genEventsData();
  //This will be used to display the data and after the data is collected the page 
  //state will change to show the events page.

  
    const getData = () => {
      if (trigger == true){
        const Card = () => {
          const Card2 = [];
          //This will create a card which will be pushed to Card2 for each event that is sent back from the database then after all the cards 
          //are finished it will be pushed to the card element where it can be displays.
          todaysEvent.forEach((data, index) => {
            console.log(data.image)
            ///Because this if statement compared the date dont forget to re formate the date into a comparable var to compare with selected date
            let defaultSource;
            if (data.image == "") {
              defaultSource = { uri: "https://www.messiah.edu/site/custom_scripts/mcnews/hero-news.jpg" }
            } else {
              defaultSource = { uri: data.image }
            }

            Card2.push(

              <View style={styles.center} key={index}>

                <View style={styles.card}>

                  <View style={[styles.imageCon]}>

                    <ImageBackground source={defaultSource} resizeMode="cover" style={styles.image} imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                      <Text style={styles.bold_subtitle_title}>{data.title}</Text>
                    </ImageBackground>
                  </View>
                  <View style={styles.pad}>
                    <Text><Text style={styles.bold_subtitle}>Date: </Text ><Text style={styles.subtitle}>{date(data)}</Text></Text>

                    <Text><Text style={styles.bold_subtitle}>Location: </Text><Text style={styles.subtitle}>{data.location}</Text></Text>

                    <Text><Text style={styles.bold_subtitle}>Time: </Text><Text style={styles.subtitle}>{time(data.dateTimeStart)}</Text></Text>

                    <Text><Text style={styles.bold_subtitle}>Cost: </Text><Text style={styles.subtitle}>${data.cost}</Text></Text>
                  </View>

                </View>
              </View>

            );
          }

          );
          
          return <View>{Card2}</View>

        }
        trigger = false;
        //This simply set the state of the page to show the cards after the events are rendered and the cards are created
        setPage(<Card />);
    }
  }
  //this function get the data from the    
  async function genEventsData() {


    const array = [];
    if (todaysEvent == null) {
      todaysEvent = await readEventData(dateCal(selectedDate));
      if (todaysEvent == "") {
        setPage(<Text>There are no events for {(selectedDate).substr(5, 2) + "-" + (((selectedDate).substr(8, 2)).substr(0, 1)).replace("0", "") + ((selectedDate).substr(8, 3)).substr(1, 1) + "-" + (selectedDate).substr(0, 4)}</Text>)
      } else {
        getData();
      }
    }
  }

  return (
    <SafeAreaView style={styles.page}>

      <Header props={props} />
      <View style={styles.app_container}>
        <View style={styles.schedule}>
          <Text style={styles.title}>Events</Text>
          <ScrollView>

            {page}

          </ScrollView>
        </View>
      </View>
      <LinearGradient
        colors={['#5DAEF8', '#4D8FCC']}
        style={styles.calendarBackground}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: null }}>
          <CalendarProvider
            date={dateCal(selectedDate)}
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
                [dateCal(selectedDate)]: { marked: true, dotColor: 'white' }
              }}
              onDayPress={(day) => {
                selectedDate = day.year + '-' + day.month + '-' + day.day;
                todaysEvent = null;
                trigger = true;
                setPage(<View style={{ borderColor: 'black', width: '100%', height: '100%', justifyContent: "center", backgroundColor: "#ffffff", alignItems: "center" }}><Image source={require('../../utils/assets/images/loading.gif')} /></View>);
                genEventsData();
              }}
              firstDay={0}
              disableAllTouchEventsForDisabledDays={false}
              enableSwipeMonths={true}
            />
          </CalendarProvider>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  app_container: {
    backgroundColor: '#FBFBFB',
    flex: 1
  },
  card: {
    height: 400,
    width: '90%',
    backgroundColor: '#DDDFE3',
    borderRadius: 25,
    margin: 10,
  },
  pad: {
    padding: 20,
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  bold_subtitle: {
    fontWeight: '600',
    fontSize: 17,
  },
  bold_subtitle_title: {
    fontWeight: '900',
    fontSize: 28,
    textAlign: 'center',
    color: 'white'
  },
  subtitle: {
    fontSize: 17,
    color: '#1E293B'
  },
  title: {
    color: '#1E293B',
    fontSize: 36,
    fontWeight: '700',
    padding: 10,
    marginTop: 10
  },
  schedule: {
    flex: 1
  },
  center: {
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: "center",
    borderRadius: 25
  },
  imageCon: {
    height: '50%',
    width: '100%',
    borderRadius: 25
  },
  calendarBackground: {
    flex: 0.15,
    backgroundColor: null
  }
});
