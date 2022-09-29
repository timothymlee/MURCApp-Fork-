import { StyleSheet, Button, View,} from "react-native";
import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { NoUnusedFragmentsRule } from "graphql";
import { getPositionOfLineAndCharacter } from "typescript";


type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function;};
};

export default function Index(props: CompProps) {
  const [result, setResult] = useState(null);

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
      <View style={styles.resourceButtons} on>
      <MapGrid 
      dest={_handlePressButtonAsync}>  
      </MapGrid>
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
  resourcesList: ["Union", "Falcon", "CashNet", "Personal Info", "Register For Classes"],
  resourceDestinations: [],
  editing: false,
  positions: [],
  switch: [],
  toggled: false
  
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
    }   
  }

  for (let i = 0; i < resources.resourcesList.length; i++){
  //the titles and position of a button are determined by the values within resources.positions
  //each render the button is updated with the new title and position and pushed to source buttons as seen below
    sourceButtons.push(ResourceButtons(resources.resourcesList[resources.positions[i]], sources.dest, resources.positions[i]));
  }
  /*useful for position testing
  console.log("Position array V");
  console.log(resources.positions);
  */
  return <>{sourceButtons}</>
}


function ResourceButtons (name, destination, position) {
  
  let [switching, setSwitching] = React.useState(false);
  let [editC, setEditC] = React.useState(resources.editing)
  
  if( editC == true){
    destination = handleButtonSwap;
  }
  //switching is used to force the buttons to re-render
  function handleButtonSwap(e){
    setSwitching(!switching);
    if (resources.editing == true)
    {      
      if (resources.switch.length < 1)
      {
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
  function onMouseEnter(e){
    //used to update the buttons with the boolean of resources.editing
    //without this check, it will load the links before one can edit, when in edit mode.
    setSwitching(!switching);
    if(resources.editing == true){
      destination=handleButtonSwap;
    }
    else{
      destination
    }
    destination();
  }

  
  
  let colors = "#000000";
  let rButton =<Button
  color={colors} 
  title={name+""} 
  onPress={onMouseEnter}
  on>
  </Button>
  //<div onMouseEnter={onMouseEnter}>{rButton}</div>
  let finalCard = <View style={styles.resourceButtons} 
  >
    
  {rButton}
  </View>

  return( <>
    {finalCard}
  
    </>
    
  )
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: "10%",
  },
  resourceButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop:"5%",
    marginLeft: "5%",
    marginBottom: "10%",
    position: "relative",
  },
  editButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    top:"80%",
    marginLeft: "80%",
    position: "absolute",
    

  }
});


