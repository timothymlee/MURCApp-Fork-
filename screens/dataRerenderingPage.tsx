import { StyleSheet, ImageBackground, View, Image, SafeAreaView, Text, ScrollView, KeyboardAvoidingView, Keyboard, Pressable } from "react-native";
import React, { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon, CheckBox } from "@rneui/themed";
import AnimatedInput from "react-native-animated-input";
import { color, renderNode } from "@rneui/base";
import {readEventData} from '../src/firebaseCalls';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';



const todaysDate = ((new Date().getFullYear().toLocaleString())+'-'+(new Date().getMonth() + 1).toLocaleString())+'-'+(new Date().getDate().toLocaleString())
let DataState = false;
let selectedDate = todaysDate;
type CompProps = {
  navigation: { navigate: Function; };
};

//let str = selectedDate.substring(0, pos) + chr + selectedDate.substring(pos, selectedDate.length);

function dateCal(data){
    const myArray = data.split("-");
    let year = myArray[0];
    let month = ("0" + myArray[1]).slice(-2)
    let day = ("0" + myArray[2]).slice(-2)
    //date gen conversion
    let date = year + '-' + month + '-' + day;
    return date;
}


let todaysEvent = null;
let today = new Date().toISOString().substring(0, 10);
function date(data){
    let gendate;
    if (data.dateTimeStart.substr(0,10) == data.dateTimeEnd.substr(0,10)){
        let year = (data.dateTimeStart).substr(0,4);
        let month = (data.dateTimeStart).substr(5,2);
        let day = (((data.dateTimeStart).substr(8,2)).substr(0,1)).replace("0", "") + ((data.dateTimeStart).substr(8,3)).substr(1,1);
        gendate = month + '-' + day + '-' + year;
    }
    if(data.dateTimeStart.substr(0,10) != data.dateTimeEnd.substr(0,10)){
        let year = (data.dateTimeStart).substr(0,4);
        let month = (data.dateTimeStart).substr(5,2);
        let day = (((data.dateTimeStart).substr(8,2)).substr(0,1)).replace("0", "") + ((data.dateTimeStart).substr(8,3)).substr(1,1);
        let start = month + '-' + day + '-' + year;

        let year2 = (data.dateTimeEnd).substr(0,4);
        let month2 = (data.dateTimeEnd).substr(5,2);
        let day2 = (((data.dateTimeEnd).substr(8,2)).substr(0,1)).replace("0", "") + ((data.dateTimeEnd).substr(8,3)).substr(1,1);
        let end = month2 + '-' + day2 + '-' + year2;

        gendate = start + ' to ' + end
        
    }
    
    return gendate;

}

  
//time gen conversion
function time(data){
    let time;
    let hour = (data).substr(11,2);
   
    let minute = (data).substr(14,2);
    if (parseInt(hour) > 12){
        time = (parseInt(hour) - 12) +':'+ minute + " PM"
    }else {
       
        let hour1 = ((hour).substr(0,1)).replace("0", "") + ((hour).substr(1,2));
        time = hour1 + ':' + minute + ' AM'
    }
    return time;
}



export default function TestPage(props: CompProps) {
        //This created the page state which by defualt is set to show a loading gif 
        //until the page state is changed.
        const [page, setPage] = useState(<View style={{borderColor:'black' ,width:'100%',height:'100%', justifyContent:"center",backgroundColor:"#ffffff", alignItems:"center"}}><Image source={require('../src/assets/loading.gif')}/></View>);

        //This will be used to get the data and after the data is collected the page 
        //state will chage to show the events page.
        const getData = () => {
            const Card = () => {
                const Card2 = [];
                todaysEvent.forEach((data, index) => {
                    ///Because this if statement compared the date dont forget to re formate the date into a comparable var to compare with selected date
                    let imgSource;
                    if(data.image == ""){
                        imgSource = {uri: "https://www.messiah.edu/site/custom_scripts/mcnews/hero-news.jpg"}
                    } else{
                        imgSource = {uri:data.image}
                    }
                    
                        Card2.push(
                         
                            <View  style={styles.center} key={index}>
                            
                            <View style={styles.card}>
                              
                              <View style={[styles.imageCon]}>
                                
                              <ImageBackground source={imgSource} resizeMode="cover" style={styles.image} imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
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
            
            setPage(<Card/>);
        }
        
    async function genEventsData(){
        const array = [];
        if (todaysEvent == null){
            
            todaysEvent = await readEventData(dateCal(selectedDate));
            if (todaysEvent == ""){
                setPage(<Text>There are no events for { (selectedDate).substr(5,2) +"-"+ (((selectedDate).substr(8,2)).substr(0,1)).replace("0", "") + ((selectedDate).substr(8,3)).substr(1,1) +"-"+ (selectedDate).substr(0,4)}</Text>)
            }else{
                getData();
            }
           
            
        }
        
        
    }
    
    genEventsData();


    return(
        <SafeAreaView style={styles.page}>
                            
        <View style={styles.header}>
            <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
            <Pressable onPress={() => props.navigation.navigate('Settings')}>
                <Icon name="person" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
            </View>
            <View style={[styles.header_content, { alignItems: 'center' }]}>
            <Image source={require('../assets/images/messiah_logo.png')} style={styles.header_image}/>
            </View>
            <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
                <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
            </View>
        </View>
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
              onDayPress={(day) => {selectedDate = day.year + '-' + day.month + '-' + day.day; 
              todaysEvent = null;
              setPage(<View style={{borderColor:'black' ,width:'100%',height:'100%', justifyContent:"center",backgroundColor:"#ffffff", alignItems:"center"}}><Image source={require('../src/assets/loading.gif')}/></View>);
              genEventsData();}}
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
      backgroundColor:'#DDDFE3',
      borderRadius: 25,
      margin:10,
      
  
    },
    pad:{
      padding: 20,
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
    bold_subtitle:{
      fontWeight: '600',
      fontSize: 17,

    },
    bold_subtitle_title:{
        fontWeight: '900',
        fontSize: 28,
        textAlign: 'center',
        color: 'white'
      },
    header_icons: {
      color: 'white'
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
      fontSize:17,
      color: '#1E293B'
    },
    title: {
      color: '#1E293B',
      fontSize: 36,
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
    header_image: {
      width: 120,
      height: 30,
      resizeMode: 'cover'
    },
    schedule:{
     flex: 1
    },
    list_header: {
      height: 70,
      justifyContent: 'center'
    },
    link:{
      color: 'blue'
    },
    center:{
      alignItems: 'center',
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: "center",
        borderRadius:25
      },
    imageCon:{
        height: '50%',
        width: '100%',
        borderRadius:25
    },
    calendarBackground: {
        flex: 0.15,
        backgroundColor: null
      }
  });
  