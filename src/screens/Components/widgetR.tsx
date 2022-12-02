import { StyleSheet, View, TouchableOpacity, Text, PanResponder, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { title_light } from '../../assets/data'

let grayed = '#AAA';
//Not matter what it will stay guest
let isGuest = true;
let edit = true;
let reRender = false;
let lock = false;
let widgetInfo = [];
let widgetList = [];
let w = Dimensions.get('window').width;
let m = 18;
let s = (w / 4) - (2 * m);

function fillWidgetList() {
  if(lock == false){
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

    if (widgetList.length != widgetInfo.length){
      widgetList.push({
        name: widget.name,
        icon: widget.icon,
        destination: widget.url,
        color: widget.color,
        posX: 0,
        posY: 0,
        id: i,
        key:widget.key,
        width: w,
        height: h,
        guest: widget.guest
      })
    }
    else{
    }
    i++
  })
  }}



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
  let [rerender, setRerender] = React.useState(reRender);

  // There is an error involving hook re-renders that has something to do with these useRefs
  const containerViewRef = useRef<View>(null);

  // Creating Pan Responder
  const pan = useRef<any>(new Animated.ValueXY()).current;
  let pressingTouch = true;

  const panResponder = useRef(

    //sends a brodcast at everytouch on the screen and if an the app will manage the touch
    PanResponder.create({
      /*This determines whether our pan responder should actuallly do anything. */
      onMoveShouldSetPanResponder(event, gestureState){
        //This will tell the pan responder to do something only after the press is in a set position
        if (gestureState.dx === 0 || gestureState.dy === 0) {
          return false;
        }
        return true;
      },
      //activates after a onMoveShouldSetPanResponder is set to true
      onPanResponderGrant: () => {
        //This changes the x and y value of the object as the finger moves
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
        //thisWidget isnt being updated? why? old cord are staying the same
        console.log("new switch");
        console.log("-");
        widgetList.map(function (thisWidget) {
          console.log(thisWidget.name);
          let x = gestureState.moveX;
          //setX(x = gestureState.moveX);
          let y = gestureState.moveY;
          //setY(y = gestureState.moveY);
          let widgetX = thisWidget.posX;
          //setWidgetX(widgetX = thisWidget.posX);
          let widgetY = thisWidget.posY;
          //setWidgetY(widgetY = thisWidget.posY);

          if (
            (x >= (widgetX - thisWidget.width / 2)) && (x <= (widgetX + thisWidget.width / 2))
            && (y >= (widgetY - thisWidget.height / 2)) && (y <= (widgetY + thisWidget.height / 2))
            && thisWidget.id != widget.id
          ) {
            console.log("SWITCH " + widget.name + " (" + (widgetList.findIndex((el) => el.id === widget.id)) + ") with " + thisWidget.name + " (" + (widgetList.findIndex((el) => el.id === thisWidget.id)) + ")")
            const toSwitch = widgetList[widgetList.findIndex((el) => el.id === thisWidget.id)];
            const currentId = widgetList[widgetList.findIndex((el) => el.id === widget.id)];
            



            widgetList[widgetList.findIndex((el) => el.id === thisWidget.id)]=currentId;
            widgetList[widgetList.findIndex((el) => el.id === widget.id)]=toSwitch;
            //thisWidget=widgetList;
            lock = true;
            setRerender(rerender = true);
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
    if (rerender == true) {
      setRerender(rerender = false);
      //console.log("Rendered List: ")
      //console.log(widgetList)
      
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
        //console.log("Rendered");
        //console.log(widgetList[widget.id]);
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
            <Icon style={styles.widgetIcon} name={widget.icon} size={30} type={"ionicon"} color={'white'}></Icon>
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
  const nav = useNavigation();
/*
  */
  fillWidgetList();
 
    if (update == true){
    setUpdate(update = false);
    //console.log("Updated List");


  }
  
  return (
    <View style={styles.container}>
      <View style={styles.resourceButtons}>
        {
        widgetList.map((widget) => (
            ResourceButtons(widget)
          )
        )
        }
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
    color: title_light,
    minWidth: "25%",
    maxWidth: "100%",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
  },
  widgetIcon: {

  }
});
