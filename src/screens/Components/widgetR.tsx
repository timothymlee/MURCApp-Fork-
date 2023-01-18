import { StyleSheet, View, TouchableOpacity, Text, PanResponder, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { title_light } from '../../assets/data'


//See sourceButtons in index for reference.
let grayed = '#AAA';
//Not matter what it will stay guest
let isGuest = true;

let reRender = false;
let lock = false;
let widgetList = [];


let positionsX = [];
let positionsY = [];
let positions = [];


let w = Dimensions.get('window').width;
let m = 18;
let s = (w / 4) - (2 * m);

function fillWidgetList(widgetInfo) {
  console.log("FILL WIDGET LIST " + widgetInfo)
  if (lock == false) {
    let i = 0
    // Reset everything before re-adding
    widgetList = [];
    positions = [];
    positionsX = [];
    positionsY = [];
    //populates the needed arrays that will be used to swap the widgets later.
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
        key: widget.key,
        width: w,
        height: h,
        guest: widget.guest,
        arrayPos: i
      })

      //These are especially important as React Native prefers to have values coming in on re-render
      //that have changed rather than changing values that already exist before a re-render
      positions.push(i);
      //instantiate positions X
      //instantiate positions X and Y
      positionsX.push(0);
      positionsY.push(0);
      i++
    })
  }
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

function ResourceButtons(widget, nav, removeWidget) {

  let [rerender, setRerender] = React.useState(reRender);
  let layoutPos = widget.arrayPos;

  const containerViewRef = useRef<View>(null);

  // Creating Pan Responder
  const pan = useRef<any>(new Animated.ValueXY()).current;
  let pressingTouch = true;

  const panResponder = useRef(

    //sends a brodcast at everytouch on the screen and if an the app will manage the touch
    PanResponder.create({
      /*This determines whether our pan responder should actuallly do anything. */
      onMoveShouldSetPanResponder(event, gestureState) {
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

        //console.log("new switch");
        //console.log("-");

        //This effectively goes through the various position arrays and
        //checks to see if the positions of the widget currently moving and the widget
        //that will be swapped overlap with one another.
        widgetList.map(function (thisWidget) {
          //console.log(thisWidget.name);
          if (
            (((gestureState.moveX >= positionsX[i] - widget.width &&
              (gestureState.moveX <= positionsX[i] + widget.width))
              &&
              (((gestureState.moveY >= positionsY[i] - widget.height) &&
                (gestureState.moveY <= positionsY[i] + widget.height)))
              &&
              (widget.id != thisWidget.id)))) {
            //console.log("SWITCH " + widget.name + " (" + (widgetList.findIndex((el) => el.id === widget.id)) + ") with " + thisWidget.name + " (" + (widgetList.findIndex((el) => el.id === thisWidget.id)) + ")")

            //switches positions in the positions array.
            //eg if the array were 0,1,2,3
            //and 1 and 2 were swapped,
            //then the position array would be 0,2,1,3
            //this is done so that when the widgets are rendered
            //they are rendered in the order of the above hypothetical array.
            //This is done because what determines the render pageX and pageY values
            //in the onLayout function uses the values presented with how the buttons are ordered.
            //Previous code had the widgetList having the widgets inside being swapped.
            //This however would mean that the posX and posY would remain un-updated.
            //Using the sense that onLayout would fix it, that would be acceptable.
            //However, React Native is a fickle thing and does not accept it.
            //You could fully, manually swap every value in the widgetList and
            //have it look perfectly as one would want for the order based rendering,
            //and it would not work. If there is a way to get it to work, I do
            //not currently know.
            //Instead I populate the three positions arrays, and then when a widget is swapped,
            //the only thing that is swapped are the values in the positions array.
            //Then, when the widgets are rendered, that array is used to determine which widgets get
            //rendered first. The first then is positioned with the first values for x and y,
            //the second with the second, and so on and so forth.
            //So far it is not perfect for having different sized widgets, but it will have to do for now.
            let toSwitchPos = positions[i];
            //let currentPos = currentId.arrayPos;
            let currentPos = positions[layoutPos];

            positions[layoutPos] = toSwitchPos;
            positions[i] = currentPos;

            lock = true;

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
        setRerender(rerender = true);
        //console.log(widgetList);

        //console.log("release");

      }
    })
  ).current;



  useEffect(() => {
    //updates the render for the buttons/widgets
    //This effectively occurs whenever a widget is pressed / released.
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
        // Setting the x and y positions for each widget
        containerViewRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            //This is not perfect due to size differences in widgets, but it will do for now.
            positionsX[layoutPos] = pageX + (width / 2);
            positionsY[layoutPos] = pageY + (height / 2);



            //console.log(widgetList);
          }
        );
        //console.log("Rendered");
        //console.log(widget.name);
        //console.log(widget.arrayPos);
        //console.log(widgetList[widget.id]);
        //console.log(widgetList);
        //console.log(positionsX);
      }}

      {...panResponder.panHandlers}
    >
      <View style={styles.resourceButtons}>
        <View style={{ width: widget.width + 2 * m, height: widget.height + 2.4 * m }}>
          <TouchableOpacity
            onPress={() => buttonPressed(widget.destination, widget.guest, nav)}
            onLongPress={() => {
              alert('Do you want to remove this widget?')
              removeWidget(widget.name);
            }}
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

  let sourceButtons = [];
  isGuest = props.guest;
  const widgetInfo = props.widgets;

  const nav = useNavigation();

  fillWidgetList(widgetInfo)

  //this is done here for more control over the loop that is to render the widgets.
  sourceButtons = [];
  for (let i = 0; i < positions.length; i++) {
    //The i'th value in the positions array is used to determine the order
    //of the rendered buttons. This coupled with the previously populated positions
    //and you can effectively switch a whole load of buttons just be changing the order of the positions
    //array. It is not currently perfect, however, and has issues swapping buttons of bigger sizes and can
    //seemingly get desynced if you make too many sudden movements.
    sourceButtons.push(ResourceButtons(widgetList[positions[i]], nav, props.removeWidget));
  }
  //console.log(widgetList);
  //console.log(positions);
  //console.log(sourceButtons);
  return (
    <View style={styles.container}>
      <View style={styles.resourceButtons}>
        {
          sourceButtons
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
