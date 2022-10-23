import { StyleSheet, Button, View, Linking, TouchableOpacity, Image, Text, PanResponder, Animated} from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { NoUnusedFragmentsRule } from "graphql";
import { getPositionOfLineAndCharacter } from "typescript";
import WidgetDefault from "./Widgets/widgetDefault"

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function;};
};

export default function Index(props: CompProps) {
  const [result, setResult] = useState(null);
  //not currently being utilized, artifact from original index vvvvv
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://union.messiah.edu/menu/', {
      enableBarCollapsing: true,
      toolbarColor: '#2a3e5e'
    });
    setResult(result);
  };
  


  //the lone button below represents the default button
  //<Button title="eats" onPress={_handlePressButtonAsync} />
  //the MapGrid is used for making the procedural buttons
  return (
   
    <View style={styles.container}>
      <View style={styles.resourceButtons} 
      >
      <MapGrid 
      dest={openLink}>  
      </MapGrid>
      <View
       onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        console.log("Test Widget Position");
        console.log("x:", layout.x);
        console.log("y:", layout.y);
      }}>
        <WidgetDefault></WidgetDefault>
      </View>
      </View>
      
      <View style={styles.editButton}>
        <ToggleButton
        ></ToggleButton>
      </View>
      
    </View> 
  );
}

//placeholder for potential JSON file implementation.
//It currently contains the titles for the buttons
let resources ={
  resourcesList: ["Union", "The Falcon", "Student Events", "Map", "Lottie Menu"],
  resourceDestinations: ['https://union.messiah.edu/menu/', 'http://falcon.messiah.edu/menu/',
'https://www.messiah.edu/a/sso/sso.php?url=https://www.messiah.edu/student-events', 'https://tour.messiah.edu/campus-map/',
'https://www.messiah.edu/a/sso/sso.php?url=https://www.messiah.edu/download/downloads/id/9433/Lottie_thisweek.pdf'],
 resourceImages: [require("./../src/assets/img/food.png"), require("./../src/assets/img/dollar.png"), 
  require("./../src/assets/img/calander.png"), 
  require("./../src/assets/img/book.png"), require("./../src/assets/img/food.png")],
  editing: false,
  positions: [],
  switch: [],
  toggled: false,
  positionsX: [],
  positionsY: []
  
} 
function openLink(link){
  Linking.openURL(link);
}
function ToggleButton(){
  let [switchE, setSwitchE] = React.useState(resources.editing);
  let [statusE, setStatusE] = React.useState("Edit");
  let [color, setColor] = React.useState("#00ff00");
  function toggleEdit(e){
    setSwitchE(switchE=!switchE);
      resources.editing=switchE;
    if (switchE==true){
      setStatusE(statusE="Stop Editing");
      setColor(color="#ff0000");
    }
    else{
      setStatusE(statusE="Edit");
      setColor(color="#00ff00");
    }
    
  };
  let editButton =<Button title={statusE} color={color} onPress={toggleEdit}></Button>
  return <>{editButton}</>
}


//May not be best practice to directly edit the resources file.
//On the flip side, I do not believe it is possible or advisable to edit props.
function  MapGrid (sources){
  let sourceButtons = [];
  //names = ["Union", "Falcon", "Test"];
  //need to add unique key prop later on.
  //The below code is for populating the initial positions array.
  if(resources.positions.length == 0){
    for(let i = 0; i < resources.resourcesList.length; i++){
      resources.positions.push(i);
      //instantiate positions X
      resources.positionsX.push(0);
      resources.positionsY.push(0);
    }   
  }

  for (let i = 0; i < resources.resourcesList.length; i++){
  //the titles and position of a button are determined by the values within resources.positions
  //each render the button is updated with the new title and position and pushed to source buttons as seen below
    sourceButtons.push(ResourceButtons(resources.resourcesList[resources.positions[i]], 
      //sources.dest(resources.resourceDestinations[i]), 
      resources.resourceDestinations[resources.positions[i]],
      resources.positions[i]));
      //^^ i is being used as a place holder for the x position
  }
  /*useful for position testing
  console.log("Position array V");
  console.log(resources.positions);
  */
  return <>{sourceButtons}</>
}








function ResourceButtons (name, destination, position) {
  
  let [switching, setSwitching] = React.useState(false);
  let [editC, setEditC] = React.useState(resources.editing);

  
  //hopefully the documentation code on the pan responder works
  const pan = useRef<any>(new Animated.ValueXY()).current;
  
  //console.log(pan);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        //const {locationX, locationY} = e.nativeEvent;
        //console.log(locationX+" is X");
        //console.log(locationY+" is Y");
        
        /*pan.setOffset({
          x: 0,
          y: 0
        });*/
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        console.log(name);
        console.log("Current positions array vvvv");
        console.log(resources.positions);
      },
      onPanResponderMove: Animated.event(
        
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
        
      ),
      onPanResponderRelease: (e, gestureState) => {
        let point = position;
        let dest = position;

        //flatten offset is to keep the current
        //position that the button is moved to.
        //setting values to 0 cause button to return to orignal spot
        //setSwitch just for updating
        setSwitching(!switching);
        if(resources.editing==false)
        {
          for(let i = 0; i < resources.positionsX.length; i++)
        {
          
            if(
            (((resources.positionsX[position]+gestureState.dx >= resources.positionsX[i]-40) && 
            (resources.positionsX[position]+gestureState.dx <= resources.positionsX[i]+40))
            && 
            (((resources.positionsY[position]+gestureState.dy >= resources.positionsY[i]-40) && 
            (resources.positionsY[position]+gestureState.dy <= resources.positionsY[i]+40))))
            && 
            (position!=i) 
            )
            /*
            if(
              (((gestureState.moveX+gestureState.dx >= resources.positionsX[i]-80) && 
              (gestureState.moveX+gestureState.dx <= resources.positionsX[i]+80))
              && 
              (((gestureState.moveY+gestureState.dy >= resources.positionsY[i]-80) && 
              (gestureState.moveY+gestureState.dy <= resources.positionsY[i]+80))))
              && 
              (position!=i) 
              )*/
            /*
            if(
              (((gestureState.moveX-90 >= resources.positionsX[i]-40) && 
              (gestureState.moveX-90 <= resources.positionsX[i]+40))
              && 
              (((resources.positionsY[position]+gestureState.dy >= resources.positionsY[i]-40) && 
              (resources.positionsY[position]+gestureState.dy <= resources.positionsY[i]+40))))
              && 
              (position!=i) 
              )*/
          {
            
            //if within range of another button, swaps the buttons.
            console.log("within range!");
            //vvvv can't be used to re-sort array due to automatic updating of positions.
            let posCurX = resources.positionsX[position];
            let posSwapX = resources.positionsX[i];
            let posCurY = resources.positionsY[position];
            let posSwapY = resources.positionsY[i];
            /*
            pan.setOffset({
              x: posSwap,
              y:0
            })*/
            
            //reinstate later
            /*
            resources.positionsX[i] = posCurX;
            resources.positionsX[position] = posSwapX;
            resources.positionsY[i] = posCurY;
            resources.positionsY[position] = posSwapY;
            console.log(resources.positionsX);
            console.log(resources.positionsY);
            */


            /* re instate later
            resources.positions[position] = i;
            resources.positions[i] = position;
            console.log("Updated Positions vvv");
            console.log(resources.positions);
            //need to find way to update pan / transform / or layout with the newly swapped positions.
            //Pan only responds when actually used for the individual instances :(
            //Switching here just for the reponsiveness, need to gut the old switching stuff then.
           
        
            setSwitching(!switching);
            
            //break;
            */
           //the issue is with how to calculate the positon of the buttons
           //and where it is in the array.
           //right now the location of the card is put in the same place as its position
           //This is makes sense, as the exact positons change when swapping, but
           //makes it hard to calculate when the position of the button is close
           //to the desired button to be swapped.
          setSwitching(!switching);
           point = i;
           dest = position;
                        
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
        resources.positions[point] = dest;
        resources.positions[dest] = point;

        console.log("abs x value: " + gestureState.moveX);
        console.log("abs y value: " + gestureState.moveY);
        console.log("dx: " + gestureState.dx);
        console.log("dy: " + gestureState.dy);
        console.log("x0: " + gestureState.x0);
        console.log("y0: " + gestureState.y0);
        console.log(resources.positionsX);
        console.log(resources.positionsY);
        console.log(resources.positions);
        setSwitching(!switching);
        
        
      }
    })
  ).current;



  if( editC == true){
    destination = handleButtonSwap;
  }
  //switching is used to force the buttons to re-render
  function handleButtonSwap(e){
    setSwitching(!switching);
    //if (resources.editing == true)
    if(editC == true)
    {      
      if (resources.switch.length < 1)
      {
        //pushes the current button to be swapped into the switch array
        resources.switch.push(position); 
      }
     else
    {
     resources.switch.push(position);
     //switches positions of elements when editing
     let e0 = resources.switch[0];
     let e1 = resources.switch[1];
     for(let j = 0; j<resources.positions.length; j++){
       if(resources.positions[j] == e0){
         resources.positions[j] = e1;
       }
       else if (resources.positions[j] == e1){
         resources.positions[j] = e0;
       }
     }
     //resets switch array
     resources.switch.length=0;
     //useful for testing to make sure position swapping works
     //console.log("Switch array");
     //console.log(resources.switch);
     //console.log("Pos array");
     //console.log(resources.positions);   
     
    }
      
    }
  }
  function onButtonPress(e){
    //used to update the buttons with the boolean of resources.editing
    //without this check, it will load the links before one can edit, when in edit mode.
    console.log(name);
    console.log("Pressed");
    setSwitching(!switching);
    if(resources.editing == true){
      destination=handleButtonSwap;
      destination()
    }
    else{
      openLink(destination);
    }

  }
  function onHoldingPress(e){
    console.log("longPress");
  }
  function onRelease(){
    console.log("Released");
  }

  
  let rButton =<TouchableOpacity
  //color={styles.resourceButtons.color} 
  //right now, when a user is editing, pressing on a button causes it
  //to be moved to the left by a factor of 5.
  //Hopefully changing this to touch / mouse pos will allow for a proper drag and drop.
  style={[styles.buttonSize3]}
  //title={name+""} 
  /*
  delayPressIn={500}
  onPressIn={onHoldingPress}
  pressRetentionOffset={{left:100, top:100, right:100, bottom:100}}
  delayLongPress={700}
  onLongPress={onHoldingPress}
  onPressOut={onButtonPress}
  delayPressOut={1500}*/
  onPress={onButtonPress}
  onPressOut={onRelease}
  

  
  

  
  
  >
    <Image source={resources.resourceImages[position]}/>
    <Text style={{color: "#ffffff"}}>{name}</Text>
  </TouchableOpacity>

  //}
  let finalCard = <Animated.View onLayout={(event) => {
    const layout = event.nativeEvent.layout;
    console.log("Intial Layout on render / re-render");
    resources.positionsX[position] = layout.x;
    resources.positionsY[position] = layout.y;
    console.log("x positions vvv");
    console.log(resources.positionsX[position]);
    console.log(resources.positionsX);
    console.log("y positions vvvv");
    console.log(resources.positionsY[position]);
    console.log(resources.positionsY);
    console.log("height:", layout.height);
    console.log("width:", layout.width);
    console.log(name+" position");
    console.log("x:", layout.x);
    console.log("y:", layout.y);
  }}
  style={{
    transform: [{ translateX: pan.x }, { translateY: pan.y }]
  }}
  
  {...panResponder.panHandlers}
  > 
    
  <View style={styles.resourceButtons}>
  {rButton}
  </View>
  
  
  </Animated.View>
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
    backgroundColor: '#CCC',
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
  buttonSize2: {
    alignItems: 'center',
    backgroundColor: '#5EAEF9',
    padding: 15

  },
  buttonSize3: {
    alignItems: 'center',
    backgroundColor: '#5EAEF9',
    padding: 30

  },
  
});


