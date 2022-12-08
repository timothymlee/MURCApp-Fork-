import { StyleSheet, View, TouchableOpacity, Text, PanResponder, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

let grayed = '#AAA';

// Determines if certain buttons are disabled
let isGuest = true;
let edit = true;
let reRender = false;
// Stores all info for each widget
let widgetInfo = [];
let widgetList = [];


// These variables are for button styling
let w = Dimensions.get('window').width;
let m = 18;
let s = (w / 4) - (2 * m);

function fillWidgetList() {
  let i = 0
  //widgetList = [];
  widgetInfo.map(function (widget) {
    let w = 0;
    let h = 0;
    if (widget.size == 0) { w = s }
    if (widget.size == 1 || widget.size == 4) { w = s * 2 + m * 2 }
    if (widget.size == 2 || widget.size == 5) { w = s * 3 + m * 4 }
    if (widget.size == 3 || widget.size == 6) { w = s * 4 + m * 6 }
    if (widget.size < 4) { h = s }
    else { h = s * 2 + m * 2 }

    if (widgetList.length < widgetInfo.length){

      widgetList.push({
        name: widget.name,
        icon: widget.icon,
        destination: widget.url,
        color: widget.color,
        posX: 0,
        posY: 0,
        key: widget.key,
        id: i,
        width: w,
        height: h,
        guest: widget.guest
      })
      return (<View key={widget.key}></View>)
    }
    else{
      console.log("Widgets Full")
      //widgetList[i] = widgetList[i];
      //console.log(widgetList);
      
    }
    i++
    //console.log(i);
    //console.log(widgetList);
  })
}



function buttonPressed(destination, guest, nav) {
  
  if (isGuest && !guest) {
    // Button is disabled
    alert("You must log in to use this widget.")
  }
  else {
    nav.navigate(destination);
  }
}

function ResourceButtons(widget, nav) {
  let [editC, setEditC] = React.useState(reRender);
  //let [x, setX] = React.useState(0);
  //let [y, setY] = React.useState(0);
  //let [widgetX, setWidgetX] = React.useState(0);
  //let [widgetY, setWidgetY] = React.useState(0);
  // Gets called once for each widget on the screen

  // There is an error involving hook re-renders that has something to do with these useRefs
  const containerViewRef = useRef<View>(null);

  // Creating Pan Responder
  const pan = useRef<any>(new Animated.ValueXY()).current;
  let pressingTouch = true;


  //const [editC, setEditC] = React.useState(false);

  /*useEffect(() => {
    //updates the render for the buttons
    if (editC == true) {
      setEditC(false);
    }
  });*/

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pressingTouch = true;
      },
      onPanResponderMove: (e, gestureState) => {
        //if the button is pressed for long enough, the user must be trying to switch it.
        //if(Math.abs(pan.x._value) > 5 || Math.abs(pan.y._value) > 5)

        if (setTimeout(function () { { timePassed: true } }, 2000)) { pressingTouch = false; }
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
        let i = 0;
        widgetList.map(function (thisWidget) {
          let x = gestureState.moveX;
          //setX(x = gestureState.moveX);
          let y = gestureState.moveY;
          //setY(y = gestureState.moveY);
          let widgetX = thisWidget.posX;
          //setWidgetX(widgetX = thisWidget.posX);
          let widgetY = thisWidget.posY;
          //setWidgetY(widgetY = thisWidget.posY);


          //console.log("WidX " + widgetX + " WidY " + widgetY);
          //console.log("x "+ x+ " y " + y);
          //console.log(widget.name);
          //console.log(widget.key+ " cur wid");
         // console.log(thisWidget.key+ " target wid");

          if (
            (x >= (widgetX - thisWidget.width / 2)) && (x <= (widgetX + thisWidget.width / 2))
            && (y >= (widgetY - thisWidget.height / 2)) && (y <= (widgetY + thisWidget.height / 2))
            && thisWidget.id != widget.id
            //alternatively use .name
          ) {
            
            console.log("SWITCH " + widget.name + " (" + widget.id + ") with " + thisWidget.name + " (" + thisWidget.id + ")")
            
            //if within range of another button, swaps the id
            let toSwitchId = thisWidget.id;
            let currentId = widget.id;
            //setCurId(curId=currentId);
            //setDesId(desId=i);
            //let currentName = widget.name;
            //let currentId = widget;

            //widgetList[widget.id].id = thisWidget.id;
            //widgetList[toSwitchId].id = widget.id;
            //i is probably better for determining targeted button
            //works first time, but subsequent drag and drops act like the
            //selected buttons are in their intial positions?
            let curPosX = widget.posX;
            let curPosY = widget.posY;

            let desPosX = thisWidget.posX;
            let desPosY = thisWidget.posY;

            //for swtiching ids

            //original switcher vvvv
            widgetList[currentId].id = thisWidget.id;
            
            
            //widgetList[curId].id = thisWidget.id;
            widgetList[currentId].posX = desPosX;
            widgetList[currentId].posY = desPosY;

            //widgetList[currentId].name = thisWidget.name;
            
            //original switcher vvvvvvv
            widgetList[toSwitchId].id = currentId;
            
            //widgetList[desId].id = currentId;
            widgetList[toSwitchId].posX = curPosX;
            widgetList[toSwitchId].posY = curPosY;
            //can also use i ^^^ I think
            //widgetList[i].name = currentName;
            //console.log(widgetList);
            //for switching whole widgets
            //widgetList[currentId.id] = thisWidget;
            //widgetList[i] = currentId;
            //widgetList[i] = widget;
            // Sorts order of widgets based on their id
            console.log(widgetList);
            widgetList.sort((a, b) => a.id - b.id);
            console.log(widgetList);
            setEditC(editC = true);


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
        
        
        console.log("release");
        
      }
    })
  ).current;
  
  
  
  useEffect(() => {
    //updates the render for the buttons
    if (editC == true) {
      setEditC(editC = false);
      console.log("Rendered List: ")
      console.log(widgetList)
      
    }
  });
  return (
    <Animated.View
      key={widget.key}
      collapsable={false}
      ref={containerViewRef}
      // Puts button in proper absolute position
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        flexDirection: 'row',
      }}
      
      onLayout={() => {

        //above needs containerViewRef in order to call onLayout
        // Setting posX and posY for each widget
        containerViewRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            
            widgetList[widget.id].posX = pageX + (width / 2);
            widgetList[widget.id].posY = pageY + (height / 2);

          }
        );
        console.log("Rendered");
        console.log(widgetList[widget.id]);
      }}

      {...panResponder.panHandlers}
    >
      <View style={styles.resourceButtons}>
        <View style={{ width: widget.width + 2 * m, height: widget.height + 2.4 * m }}>
          <TouchableOpacity
            onPress={() => buttonPressed(widget.destination, widget.guest, nav)}
            style={[
              styles.widgetButton,
              {
                width: widget.width, height: widget.height, backgroundColor: (!widget.guest && isGuest) ? grayed : widget.color,
                opacity: (!widget.guest && isGuest) ? 0.5 : 1
              }]}>
            <Icon style={styles.widgetIcon} name={widget.icon} size={30} type="ionicon" color={'white'}></Icon>
          </TouchableOpacity>
          <Text style={styles.buttonTextStyle}>{widget.name}</Text>
        </View>
      </View>

    </Animated.View>
  )
}

export default function WidgetScreenDisplay(props) {
  let [update, setUpdate] = useState(false);

  isGuest = props.guest;
  widgetInfo = props.widgets;
  console.log("Props.Widget");
  console.log(props.widget);
  console.log("WidgetInfo");
  console.log(widgetInfo);
  const nav = useNavigation();
/*
  */
  fillWidgetList();
 
    if (update == true){
    setUpdate(update = false);
    console.log("Updated List");
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.resourceButtons}>
        {widgetList.map((widget) =>
          ResourceButtons(widget, nav)
        )}
      </View>
    </View>
  );
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
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonTextStyle: {
    color: 'white',
    minWidth: "25%",
    maxWidth: "100%",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
  },
  widgetIcon: {

  }
});
