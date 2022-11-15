import { StyleSheet, Button, View, Linking, TouchableOpacity, Image, Text, PanResponder, Animated} from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { NoUnusedFragmentsRule } from "graphql";
import { getPositionOfLineAndCharacter } from "typescript";
import WidgetDefault from "./Widgets/widgetDefault"
//not being used VVVVVV
type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function;};
};

export default function Index(props) {
  const [result, setResult] = useState(null);
  //not currently being utilized, artifact from original index vvvvv
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://union.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };
  //takes in the props from home.
  //include <WidgetDefault> for testing modular widgets
  let navigator = props.navFun;
  console.log(navigator);


  //the MapGrid is used for making the procedural buttons
  return (
    
    <View style={styles.container}>
      <View style={styles.resourceButtons} 
      >
      <MapGrid sources={navigator}
      //dest={openLink}
      
      >  
      </MapGrid>
      <View
       onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        console.log("Test Widget Position");
        console.log("x:", layout.x);
        console.log("y:", layout.y);
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
let resources ={
  resourcesList: ["Union", "The Falcon", "Chapel", "Gym", "Lottie Menu"],
  /*resourceDestinations: ['https://union.messiah.edu/menu/', 'http://falcon.messiah.edu/menu/',
'https://www.messiah.edu/a/sso/sso.php?url=https://www.messiah.edu/student-events', 'https://tour.messiah.edu/campus-map/',
'https://www.messiah.edu/a/sso/sso.php?url=https://www.messiah.edu/download/downloads/id/9433/Lottie_thisweek.pdf'],*/
  resourceDestinations: ['UnionMenu','FalconMenu', 'Chapel', 'Gym', 'LottieMenu'],
 resourceImages: [require("./../src/assets/img/food.png"), require("./../src/assets/img/dollar.png"), 
  require("./../src/assets/img/calander.png"), 
  require("./../src/assets/img/book.png"), require("./../src/assets/img/food.png")],
  style: [2,1,1,1,2],
  editing: false,
  positions: [],
  switch: [],
  toggled: false,
  positionsX: [],
  positionsY: []
  
}
//below is for url refernce purposes
/*
let WidgetNames = [
  { name: "Union Cafe", url: 'UnionMenu' },
  { name: "Lottie Dining Hall", url: 'LottieMenu' },
  { name: "Chapel Attendance", url: 'Chapel' },
  { name: "Falcon", url: 'FalconMenu' },
  { name: "Gym", url: 'Gym' },
  { name: "Dining Dollars", url: 'DiningDollars' },
  { name: "Falcon Dollars", url: 'FalconDollars' }
]
*/

function openLink(link, navi, pos){
  //Linking.openURL(link);
  //above opens website urls
  //below is good for our own pages
  console.log(navi);
  navi.sources.navigation.navigate(resources.resourceDestinations[resources.positions[pos]]);
  console.log("GesturePressed")
  //for some reason the link / destination which is passed to the resource buttons do not update
  //for pan responder interactions, despite visually doing so.
  //this is also the same for name and positon. So it would seem that the values for pan responder
  //occur before the re render.
  //this is weird
  //but I suppose it occurs because the destination used to be handled onButtonPress which
  //I think occurs after everything has gone through the render?
}
function openLinkOnPress(link, navi, pos){
  console.log(navi);
  console.log("OnPressPressed")
  navi.sources.navigation.navigate(link);
}


//May not be best practice to directly edit the resources file.
//On the flip side, I do not believe it is possible or advisable to edit props.
function  MapGrid (sources){
  let sourceButtons = [];
  //note: currently the widgets / buttons use absolute positioning to calculate the postion
  //of the widgets. This works fine when the view does not scroll.
  //when it does scroll, the absolute positions change, so I need to either need to make
  //a reactive offset or update the positions array whenever the user moves the scroll view.
  //For testing moving the widgets, either use the Drag n Drop button, or don't scroll
  //the page on initial loadout.


  //need to add unique key prop later on.
  //The below code is for populating the initial positions array.
  if(resources.positions.length == 0){
    for(let i = 0; i < resources.resourcesList.length; i++){
      resources.positions.push(i);
      //instantiate positions X and Y
      resources.positionsX.push(0);
      resources.positionsY.push(0);
    }   
  }

  for (let i = 0; i < resources.resourcesList.length; i++){
  //the titles and position of a button are determined by the values within resources.positions
    sourceButtons.push(ResourceButtons(resources.resourcesList[resources.positions[i]], 
      //sources.dest(resources.resourceDestinations[i]), 
      resources.resourceDestinations[resources.positions[i]],
      resources.positions[i], i, sources, resources.style[resources.positions[i]]));
      
  }
  /*useful for position testing
  console.log("Position array V");
  console.log(resources.positions);
  */
  
  return <>{sourceButtons}</>
}








function ResourceButtons (name, destination, position, layoutPos, navi, style) {
  const containerViewRef = useRef<View>(null);

  let [, setPageY] = useState(0);
  let [, setPageX] = useState(0);
  let [h, setH] = useState(0);
  let [w, setW] = useState(0);

  let [switching, setSwitching] = React.useState(false);
  let [editC, setEditC] = React.useState(resources.editing);

  let styleType = [styles.buttonSize1,styles.buttonSize2,styles.buttonSize3];

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
        console.log(name);
        pressingTouch = true;
        //to account for scroll view
        //the below code goes through the y values and updates them
        //by taking the difference between where the user touches and the previously
        //recorded positions
        let yDifference = gestureState.moveY-resources.positionsY[layoutPos];
        for(let j = 0; j < resources.positions.length; j++)
        {
          resources.positionsY[j] += yDifference;
        }
      },
      onPanResponderMove: (e, gestureState) => {
        //if the button is pressed for long enough, the user must be trying to switch it.
        //if(Math.abs(pan.x._value) > 5 || Math.abs(pan.y._value) > 5)

        if(
          setTimeout(function(){{timePassed: true}}, 3000))
        {pressingTouch = false;}
        
       return(
        Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
        
      )(e,gestureState)
      )
    
    },
      onPanResponderRelease: (e, gestureState) => {

        //flatten offset is to keep the current
        //position that the button is moved to.
        //setting values to 0 cause button to return to orignal spot
        
        if(pressingTouch==true){
          openLink(destination, navi, position);
        }
        else{
          for(let i = 0; i < resources.positionsX.length; i++)
        {
            //since the center is pageX + width (pageY + height)
            //then adding or subtracting w/h, which are half those values should give the borders
            if(
              (((gestureState.moveX >= resources.positionsX[i]-w && 
              (gestureState.moveX <= resources.positionsX[i]+w))
              && 
              (((gestureState.moveY >= resources.positionsY[i]-h) && 
              (gestureState.moveY <= resources.positionsY[i]+h)))
              && 
              (position!=i) 
              )))
              
          {
            //initializes the placements for button touched and matched
            let buttonTouched = -1;
            let buttonMatched = -1;
            buttonMatched=resources.positions[i];
            buttonTouched=resources.positions[layoutPos];

            resources.positions[layoutPos]=buttonMatched;
            resources.positions[i]=buttonTouched;

            
            //if within range of another button, swaps the buttons.
            console.log("within range!");
            
                        
          }
          
          else
          {
            console.log("Outside range!")
            pan.setValue({
              x: 0,
              y: 0,
            });
          }
        }
        }
        

        pan.flattenOffset();
        setEditC(editC = true);
        

        console.log("abs x (moveX) value: " + gestureState.moveX);
        console.log("abs y (moveY) value: " + gestureState.moveY);
        console.log("dx: " + gestureState.dx);
        console.log("dy: " + gestureState.dy);
        console.log("x0: " + gestureState.x0);
        console.log("y0: " + gestureState.y0);
        console.log(resources.positionsX);
        console.log(resources.positionsY);
        console.log(resources.positions);
        
        
        
      }
    })
  ).current;


  //onButtonPress is good for get touches not caught by the pan responder,
  //I find.
  function onButtonPress(e){
    
    console.log(name);
    console.log("Pressed");
    //the different function is due to the different timings of
    //the pan responder vs the on press event.
    //the pan responder is too early and fires before the proper re render of the destination
    //thus openLink is called using the resources object
    //and the below uses destination.
    openLinkOnPress(destination, navi, position);

  }
  function onHoldingPress(e){
    console.log("longPress");
  }
  function onRelease(){
    console.log("Released");
  }

  
  let rButton =<TouchableOpacity onPress={onButtonPress}
  style={styleType[style]}
  >
    <Image source={resources.resourceImages[position]}/>
    <Text style={styles.buttonTextStyle}>{name}</Text>
  </TouchableOpacity>

  //}
  useEffect(() => {
    //updates the render for the buttons
    if(editC==true){
      setEditC(editC = false);
    }
    console.log("EFfect");
  });
  let finalCard = <Animated.View ref={containerViewRef} collapsable={false}
  
  style={{
    transform: [{ translateX: pan.x }, { translateY: pan.y }]
  }}

  onLayout={(event) => {
    //using the absolute value works for a non scrolling page
    //scrolling the page changes the x and y values, so I either need to
    //update them on when the user scrolls, or have an offset of some kind dependent on it.
    containerViewRef.current?.measure(
      (x, y, width, height, pageX, pageY) => {
        console.log("Intial Layout on render / re-render");
        console.log(name+"VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
        //The center of each button is equal to the page x position + half the width and or height.
        setPageX(pageX + (width/2));
        setPageY(pageY + (height/2));
        console.log(name);
        console.log("This is the page X vvvv");
        console.log(pageX + (width/2));
        console.log("This is the page Y vvvv");
        console.log(pageY + (height/2));
        console.log("Width: " + width);
        console.log("Height: " + height);
        setW(w = width/2);
        setH(h = height/2);

        
    resources.positionsX[layoutPos] = pageX + (width/2);
    resources.positionsY[layoutPos] = pageY + (height/2);
    console.log("x positions vvv");
    console.log(resources.positionsX[position]);
    console.log(resources.positionsX);
    console.log("y positions vvvv");
    console.log(resources.positionsY[position]);
    console.log(resources.positionsY);
    
    console.log("Current positions array vvvv");
    console.log(resources.positions);

    console.log("current position vvvv");
    console.log(position);
    console.log(destination);
    
      });
    
    
    
    
  }}

  
  {...panResponder.panHandlers}
  > 
    
  <View style={styles.resourceButtons}>
  {rButton}
  </View>
  
  
  </Animated.View>
  /*
  if(editC==true){
    setEditC(editC = false);
  }*/
  return( <>
    {finalCard}
    </>
    
  )
}

let styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: "10%",
    
  },
  resourceButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop:"5%",
    marginLeft: "5%",
    marginBottom: "5%",
    position: "relative",
    
    



    
  },
  editButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    bottom:"20%",
    marginLeft: "80%",
    position: "absolute",
    padding: 5
    

  },
  opacityWrapper: {
    alignItems: 'center',
    backgroundColor: '#5EAEF9',
    padding: 15,
    
  },
  buttonSize1: {
    alignItems: 'center',
    backgroundColor: '#5EAEF9',
    padding: 10
  },
  buttonSize2:{
    
    alignItems: 'center',
    backgroundColor: '#E41515',
    paddingHorizontal: 35,
    paddingVertical: 20,
    

  },
  buttonSize3: {
    alignItems: "center",
    backgroundColor: '#5EAEF9',
    padding: 10,
    
  },
  buttonTextStyle: {
    color: "#ffffff", 
    minWidth: "25%", 
    maxWidth:"100%",
    textAlign:"center",
  }
  
});


