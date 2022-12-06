import { StyleSheet, Button, View, Linking, TouchableOpacity, Image, Text, PanResponder, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';

export default function Index(props) {

  //takes in the props from home.
  //include <WidgetDefault> for testing modular widgets
  let navigator = props.navFun;

  //the MapGrid is used for making the procedural buttons
  return (
    <View style={styles.container}>
      <View style={styles.resourceButtons}>
        <MapGrid sources={navigator} />
        <View
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
          }}>
        </View>
      </View>
    </View>
  );
}

//placeholder for potential JSON file implementation.
//It currently contains the titles for the buttons
//This (the url links from falcon link) will be eventually combined with the page links for
//our own pages for the widgets and I'll be working on the logic for it.
//for the purposes of the widgets, fust add the page url from home to them.
//the convention for making the widgets / buttons is to:
//have the name in resourcesList
//have the url in resourceDestinations
//have the image link in resourceImages
let resources = {
  resourcesList: [
    "Union", "Lottie Menu", "Chapel", "The Falcon", "Gym", "Dining Dollars",
    "Falcon Dollars", "Campus Map", "Log In"
  ],
  /*resourceDestinations: ['https://union.messiah.edu/menu/', 'http://falcon.messiah.edu/menu/',
  'https://www.messiah.edu/a/sso/sso.php?url=https://www.messiah.edu/student-events', 'https://tour.messiah.edu/campus-map/',
  'https://www.messiah.edu/a/sso/sso.php?url=https://www.messiah.edu/download/downloads/id/9433/Lottie_thisweek.pdf'],*/
  resourceDestinations: ['UnionMenu', 'LottieMenu', 'Chapel', 'FalconMenu', 'Gym', "DiningDollars",
    "FalconDollars", "Map", "Login"],
  resourceImages: [
    require("./../src/assets/img/food.png"),
    require("./../src/assets/img/food.png"),
    require("./../src/assets/img/dollar.png"),
    require("./../src/assets/img/calander.png"),
    require("./../src/assets/img/book.png"),
    require("./../src/assets/img/dollar.png"),
    require("./../src/assets/img/dollar.png"),
    require("./../src/assets/img/book.png"),
    require("./../src/assets/img/target.png")
  ],
  style: [0, 6, 4, 0, 0, 1, 1, 0, 0],
  editing: false,
  positions: [],
  switch: [],
  toggled: false,
  positionsX: [],
  positionsY: []
}
let widgetInfo = [
  { name: "Union Cafe", url: 'UnionMenu', icon: '', size: 0, color: "blue" },
  { name: "Lottie Dining Hall", url: 'LottieMenu', icon: '', size: 6, color: "blue" },
  { name: "Chapel Attendance", url: 'Chapel', icon: '', size: 4, color: "blue" },
  { name: "Falcon", url: 'FalconMenu', icon: '', size: 0, color: "blue" },
  { name: "Gym", url: 'Gym', icon: '', size: 0, color: "blue" },
  { name: "Dining Dollars", url: 'DiningDollars', icon: '', size: 1, color: "blue" },
  { name: "Falcon Dollars", url: 'FalconDollars', icon: '', size: 1, color: "blue" },
  { name: "Campus Map", url: 'Map', icon: '', size: 0, color: "blue" },
  { name: "Log In", url: 'Login', icon: '', size: 0, color: "blue" },
  { name: "Drag and Drop", url: 'Index', icon: '', size: 0, color: "blue" }
]

let widgetList = []

// Should use this object instead of adding everything to one huge object
let widgetButton = {
  name: "",
  icon: "",
  destination: "",
  positionX: 0,
  positionY: 0,
  size: 0,
  color: ""
}

function openLink(link, navi, pos) {
  //Linking.openURL(link);
  //above opens website urls
  //below is good for our own pages
  navi.sources.navigation.navigate(resources.resourceDestinations[resources.positions[pos]]);
  //for some reason the link / destination which is passed to the resource buttons do not update
  //for pan responder interactions, despite visually doing so.
  //this is also the same for name and positon. So it would seem that the values for pan responder
  //occur before the re render.
  //this is weird
  //but I suppose it occurs because the destination used to be handled onButtonPress which
  //I think occurs after everything has gone through the render?
}
function openLinkOnPress(link, navi) {
  navi.sources.navigation.navigate(link);
}


//May not be best practice to directly edit the resources file.
//On the flip side, I do not believe it is possible or advisable to edit props.
function MapGrid(sources) {

  let i = 0
  let sourceButtons = [];

  widgetInfo.map(function (widget) {
    let thisWidget = widgetButton;

    thisWidget.name = widget.name
    thisWidget.destination = widget.url
    thisWidget.size = widget.size
    thisWidget.color = widget.color
    thisWidget.icon = widget.icon
    thisWidget.positionX = 0
    thisWidget.positionY = 0

    widgetList.push(thisWidget)

    sourceButtons.push(
      ResourceButtons(
        widget.name, //name
        widget.url, //destination
        i, //position
        sources, //navi
        widget.size //style
      )
    );
    i++
  })

  return <>{sourceButtons}</>
}

function ResourceButtons(name, destination, position, navi, style) {
  let layoutPos = position;
  const containerViewRef = useRef<View>(null);

  let [, setPageY] = useState(0);
  let [, setPageX] = useState(0);
  let [h, setH] = useState(0);
  let [w, setW] = useState(0);

  let [editC, setEditC] = React.useState(resources.editing);

  // Styles for each kind of button
  let styleType = [styles.buttonSize1x1, styles.buttonSize1x2,
  styles.buttonSize1x3, styles.buttonSize1x4, styles.buttonSize2x2,
  styles.buttonSize2x3, styles.buttonSize2x4];

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
        //to account for scroll view
        //the below code goes through the y values and updates them
        //by taking the difference between where the user touches and the previously
        //recorded positions
        let yDifference = gestureState.moveY - resources.positionsY[layoutPos];
        for (let j = 0; j < resources.positions.length; j++) {
          resources.positionsY[j] += yDifference;
        }
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

        //flatten offset is to keep the current
        //position that the button is moved to.
        //setting values to 0 cause button to return to orignal spot

        if (pressingTouch == true) {
          openLink(destination, navi, position);
        }
        else {
          for (let i = 0; i < resources.positionsX.length; i++) {
            //since the center is pageX + width (pageY + height)
            //then adding or subtracting w/h, which are half those values should give the borders
            if (
              (((gestureState.moveX >= resources.positionsX[i] - w &&
                (gestureState.moveX <= resources.positionsX[i] + w))
                &&
                (((gestureState.moveY >= resources.positionsY[i] - h) &&
                  (gestureState.moveY <= resources.positionsY[i] + h)))
                &&
                (position != i)
              ))) {
              //initializes the placements for button touched and matched
              let buttonTouched = -1;
              let buttonMatched = -1;
              buttonMatched = resources.positions[i];
              buttonTouched = resources.positions[layoutPos];

              //if within range of another button, swaps the buttons.
              resources.positions[layoutPos] = buttonMatched;
              resources.positions[i] = buttonTouched;
            }

            else {
              // Outside range of button
              pan.setValue({
                x: 0,
                y: 0,
              });
            }
          }
        }

        pan.flattenOffset();
        setEditC(editC = true);
      }
    })
  ).current;
  //onButtonPress is good for get touches not caught by the pan responder
  function onButtonPress(e) {

    //the different function is due to the different timings of
    //the pan responder vs the on press event.
    //the pan responder is too early and fires before the proper re render of the destination
    //thus openLink is called using the resources object
    //and the below uses destination.
    openLinkOnPress(destination, navi);

  }
  function onHoldingPress(e) {
    //console.log("longPress");
  }
  function onRelease() {
    //console.log("Released");
  }

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
        transform: [{ translateX: pan.x }, { translateY: pan.y }]
      }}
      onLayout={() => {
        //using the absolute value works for a non scrolling page
        //scrolling the page changes the x and y values, so I either need to
        //update them on when the user scrolls, or have an offset of some kind dependent on it.
        containerViewRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            //The center of each button is equal to the page x position + half the width and or height.
            setPageX(pageX + (width / 2));
            setPageY(pageY + (height / 2));
            setW(w = width / 2);
            setH(h = height / 2);

            resources.positionsX[layoutPos] = pageX + (width / 2);
            resources.positionsY[layoutPos] = pageY + (height / 2);
          });
      }}

      {...panResponder.panHandlers}
    >
      <View style={styles.resourceButtons}>
        <TouchableOpacity onPress={onButtonPress}
          style={[styleType[style], styles.widgetButton]}>
          <Image source={resources.resourceImages[position]} />
          <Text style={styles.buttonTextStyle}>{name}</Text>
        </TouchableOpacity>
        </View>

    </Animated.View>
  )
}

let w = Dimensions.get('window').width;
let m = 12;
let s = (w / 4) - (2 * m);

let styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  resourceButtons: {
    flexDirection: "row",
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
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 8
  },
  buttonSize2x4: {
    height: 2 * s + 2 * m,
    width: 4 * s + 6 * m,
  },
  buttonSize2x3: {
    height: 2 * s + 2 * m,
    width: 3 * s + 4 * m,
  },
  buttonSize2x2: {
    height: 2 * s + 2 * m,
    width: 2 * s + 2 * m,
  },
  buttonSize1x4: {
    height: s,
    width: 4 * s + 6 * m,
  },
  buttonSize1x3: {
    height: s,
    width: 3 * s + 4 * m,
  },
  buttonSize1x2: {
    height: s,
    width: 2 * s + 2 * m,
  },
  buttonSize1x1: {
    height: s,
    width: s,
  },
  buttonTextStyle: {
    color: "#ffffff",
    minWidth: "25%",
    maxWidth: "100%",
    textAlign: "center",
  }
});


