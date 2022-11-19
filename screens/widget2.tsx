import { StyleSheet, Button, View, Linking, TouchableOpacity, Image, Text, PanResponder, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from "@rneui/themed";
import * as WebBrowser from 'expo-web-browser';

let lightBlue = "#6EB3F2"
let blue = '#4552C9'
let darkBlue = '#1E293B'
let green = '#5EBD4E'

// All icons for resources
let resourceImages = [
  "md-restaurant",
  "logo-usd",
  "calendar",
  "book",
  "md-locate-sharp"
]

// Stores all info for each widget
let widgetInfo = [
  { name: "Lottie Dining Hall", url: 'LottieMenu', icon: resourceImages[0], size: 6, color: darkBlue },
  { name: "Union Cafe", url: 'UnionMenu', icon: resourceImages[0], size: 0, color: lightBlue },
  { name: "Campus Map", url: 'Map', icon: resourceImages[3], size: 0, color: darkBlue },
  { name: "Log In", url: 'Login', icon: resourceImages[4], size: 0, color: blue },
  { name: "Drag and Drop", url: 'Index', icon: resourceImages[4], size: 0, color: lightBlue },
  { name: "Chapel Attendance", url: 'Chapel', icon: resourceImages[1], size: 4, color: green },
  { name: "Falcon", url: 'FalconMenu', icon: resourceImages[2], size: 0, color: blue },
  { name: "Gym", url: 'Gym', icon: resourceImages[3], size: 0, color: green },
  { name: "Dining Dollars", url: 'DiningDollars', icon: resourceImages[1], size: 1, color: lightBlue },
  { name: "Falcon Dollars", url: 'FalconDollars', icon: resourceImages[1], size: 1, color: lightBlue },
]

let widgetList = [];

// These variables are for button styling
let w = Dimensions.get('window').width;
let m = 12;
let s = (w / 4) - (2 * m);

export default function WidgetDisplay(props) {
  //const [widgetPositions, setWidgetPositions] = useState([])

  return (
    <View style={styles.container}>
      <View style={styles.resourceButtons}>
        <>
          {fillWidgetList()}
          <MapGrid props={props} />
        </>
      </View>
    </View>
  );
}

function fillWidgetList() {
  let i = 0

  widgetInfo.map(function (widget) {
    let w = 0;
    let h = 0;
    if (widget.size == 0) { w = s }
    if (widget.size == 1 || widget.size == 4) { w = s * 2 + m * 2 }
    if (widget.size == 2 || widget.size == 5) { w = s * 3 + m * 4 }
    if (widget.size == 3 || widget.size == 6) { w = s * 4 + m * 6 }
    if (widget.size < 4) { h = s }
    else { h = s * 2 + m * 2 }

    widgetList.push({
      name: widget.name,
      icon: widget.icon,
      destination: widget.url,
      color: widget.color,
      posX: 0,
      posY: 0,
      id: i,
      width: w,
      height: h
    })
    i++
  })
}

function MapGrid(props) {

  let sourceButtons = [];

  widgetList.map(function (widget) {
    sourceButtons.push(
      ResourceButtons(
        widget.name, //name
        widget.destination, //destination
        widget.id, //position
        widget.color, //color
        widget.icon, //icon
        widget.posX, //center X
        widget.posY, //center Y
        widget.width, //width of widget
        widget.height, //height of widget
        props
      )
    );
  })

  return <>{sourceButtons}</>
}

function ResourceButtons(name, destination, position, color, icon, posX, posY, width, height, props) {
  // Gets called once for each widget on the screen
  let layoutPos = position;
  const containerViewRef = useRef<View>(null);

  let [, setPageY] = useState(0);
  let [, setPageX] = useState(0);
  let [h, setH] = useState(0);
  let [w, setW] = useState(0);

  let [editC, setEditC] = React.useState(false);

  // Creating Pan Responder
  const pan = useRef<any>(new Animated.ValueXY()).current;
  let pressingTouch = true;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pressingTouch = true;
      },
      onPanResponderMove: (e, gestureState) => {
        //if the button is pressed for long enough, the user must be trying to switch it.
        //if(Math.abs(pan.x._value) > 5 || Math.abs(pan.y._value) > 5)

        if (
          setTimeout(function () { { timePassed: true } }, 2000)) { pressingTouch = false; }

        return (
          Animated.event(
            [
              null,
              { dx: pan.x, dy: pan.y }
            ],
            { useNativeDriver: false }

          )(e, gestureState)
        )

      },

      onPanResponderRelease: (e, gestureState) => {
        console.log("release")
        let i = 0;
        widgetList.map(function (thisWidget) {
          let x = gestureState.moveX;
          let y = gestureState.moveY;
          let widgetX = thisWidget.posX;
          let widgetY = thisWidget.posY;
          //console.log(thisWidget.posX, thisWidget.posY, thisWidget.width, thisWidget.height)
          if (
            (x >= (widgetX - thisWidget.width / 2)) && (x <= (widgetX + thisWidget.width / 2))
            && (y >= (widgetY - thisWidget.height / 2)) && (y <= (widgetY + thisWidget.height / 2))
            && thisWidget.name != name
          ) {
            console.log("SWITCH " + name + " (" + position + ") with " + thisWidget.name + " (" + thisWidget.id + ")")

            //if within range of another button, swaps the buttons.
            let toSwitchId = thisWidget.id

            widgetList[position].id = thisWidget.id;
            widgetList[toSwitchId].id = position;

            widgetList.sort((a, b) => a.id - b.id);
          }
          else {
            // Outside range of button
            pan.setValue({
              x: 0,
              y: 0,
            });
          }
          i++
        })

        pan.flattenOffset();
        setEditC(editC = true);
      }
    })
  ).current;

  useEffect(() => {
    //updates the render for the buttons
    if (editC == true) {
      setEditC(editC = false);
    }
  });

  return (
    <Animated.View
      key={position}
      ref={containerViewRef}
      collapsable={false}
      // Puts button in proper absolute position
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        flexDirection: 'row'
      }}
      onLayout={() => {
        //using the absolute value works for a non scrolling page
        //scrolling the page changes the x and y values, so I either need to
        //update them on when the user scrolls, or have an offset of some kind dependent on it.
        containerViewRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            widgetList[layoutPos].posX = pageX + (width / 2);
            widgetList[layoutPos].posY = pageY + (height / 2);
          });
      }}

      {...panResponder.panHandlers}
    >
      {/*console.log(props.props.navFun.navigation)*/}
      <View style={styles.resourceButtons}>
        <View style={{ width: width + 2*m, height: height + 2.4*m }}>
          <TouchableOpacity
            onPress={() => props.props.navFun.navigation.navigate(destination)}
            style={[styles.widgetButton, { width: width, height: height, backgroundColor: color }]}>
            <Icon style={styles.widgetIcon} name={icon} size={30} type="ionicon" color={'white'}></Icon>
          </TouchableOpacity>
          <Text style={styles.buttonTextStyle}>{name}</Text>
        </View>
      </View>

    </Animated.View>
  )
}

let styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  resourceButtons: {
    flexDirection: 'row',
    flexWrap: "wrap",
    position: "relative",
  },
  editButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    bottom: "20%",
    marginLeft: "80%",
    position: "absolute",
    padding: 5
  },
  opacityWrapper: {
    alignItems: 'center',
    backgroundColor: '#5EAEF9',
    padding: 15,
  },
  widgetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4349D6',
    margin: m,
    marginBottom: m / 3,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonTextStyle: {
    color: 'white',
    minWidth: "25%",
    maxWidth: "100%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "300"
  },
  widgetIcon: {

  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'red',
    borderWidth: 2
  }
});


