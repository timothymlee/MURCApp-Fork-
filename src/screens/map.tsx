import { Pressable, Text, StyleSheet, SafeAreaView, View, Platform, StatusBar, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import { Icon, SearchBar, Button, Overlay } from "@rneui/themed";
import { CheckBox } from "@rneui/base";
import MapView, { Marker } from 'react-native-maps';
import Header from "./Components/header";
import { accent1, accent2, accent3, AllLocations, bg_default, icon_dark, icon_light, title_dark, title_light, title_mid } from '../assets/data';

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Map(props: CompProps) {

  let currentLocation = {
    latitude: 40.157515,
    longitude: -76.987994,
    latitudeDelta: 0.012,
    longitudeDelta: 0.006
  }

  var _mapView: MapView;

  const [value, setValue] = useState("");
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState("")
  const [selectedIcon, setIcon] = useState("")
  const [activePins, setPins] = useState([])
  // For overlay
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(currentLocation)

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // Each digit is a boolean that corresponds with whether that category is active.
  // They go in order of the list in AllLocations.
  const [categoriesActive, setActive] = useState([false, false, false, false, false, false, false, false, false, false, false, false])

  useEffect(() => {
    // run every time selected location changes
    setMarkers();
  }, [selected]);

  const updateSearch = (value) => {
    setValue(value);
    let storedResults = [];
    AllLocations.forEach(function (name) {
      name.category.map(function (thisLocation) {
        if (thisLocation.name.toLowerCase().includes(value.toLowerCase())) {
          storedResults.push([thisLocation, name.icon]);
        }
      });
    });
    setResults(storedResults);
  };

  function renderSelectedHeader() {
    if (selected != "") {
      return (
        <View style={styles.selectedHeader}>
          <Icon style={styles.selectedIcon} name={selectedIcon} size={22} type={'material-community'} color={icon_light}></Icon>
          <Text style={styles.selectedTitle}>{selected}</Text>
          <Pressable style={styles.closeHeaderContainer} onPress={() => { setSelected("") }}>
            <Icon name="close" size={44} color={icon_light}></Icon>
          </Pressable>
        </View>
      )
    }
  }

  function renderCheckBox(name, num) {
    return (
      <CheckBox
        checked={categoriesActive[num]}
        title={name}
        checkedColor={accent2}
        containerStyle={styles.checkboxBoxContainer}
        onIconPress={() => {
          let tempActive = categoriesActive;
          tempActive[num] = !tempActive[num];
          setActive(tempActive);
          setMarkers();
        }}
        size={32}
        uncheckedColor={title_mid}
      />
    )
  }

  function setMarkers() {
    let currentCategory = 0;
    let pinsList = [];
    categoriesActive.map(function (isActive) {
      if (isActive) {
        let thisIcon = AllLocations[currentCategory].icon;
        AllLocations[currentCategory].category.map(function (thisLocation) {
          pinsList.push([thisLocation.name, thisLocation.coords, thisIcon, false]);
        })
      }
      currentCategory++;
    })
    if (selected != "") {
      let alreadyDisplayed = false
      pinsList.map(function (pin) {
        if (pin[0] == selected) {
          pin[3] = true;
          alreadyDisplayed = true;
        }
      })
      if (!alreadyDisplayed) {
        // target icon should instead be whatever category it is from
        let thisIcon = "target";
        AllLocations.map(function (currentCategory) {
          thisIcon = currentCategory.icon;
          for (let i = 0; i < currentCategory.category.length; i++) {
            if (currentCategory.category[i].name == selected) {
              pinsList.push([selected, location.latitude + ", " + location.longitude, thisIcon, true])
              break;
            }
          }
        })
      }
    }
    setPins(pinsList);
  }

  const handleSearchChange = () => {
    if (value == "") {
      return (
        <>
          {renderSelectedHeader()}

          <View style={{ flex: 1, height: '100%' }}>
            <MapView
              // MapView is using this package:
              // https://www.npmjs.com/package/react-native-maps 
              mapType='hybrid'
              //provider={PROVIDER_GOOGLE}
              //customMapStyle={mapStyle}
              // "showsUserLocation" can be enabled, but we need to ask for user permission to do so
              showsUserLocation
              ref={(mapView) => { _mapView = mapView; }}
              style={styles.map}
              initialRegion={location}
            >
              {
                activePins.map(function (pin, i) {
                  let splitCoord = pin[1].split(", ");
                  return (
                    <Marker
                      key={i}
                      coordinate={{ latitude: splitCoord[0] * 1.0, longitude: splitCoord[1] * 1.0 }}
                      onPress={() => {
                        setSelected(pin[0]);
                        setIcon(pin[2]);
                        _mapView.animateToRegion({
                          latitude: splitCoord[0],
                          longitude: splitCoord[1],
                          latitudeDelta: 0.001,
                          longitudeDelta: 0.0018,
                        }, 500)
                        setLocation({
                          latitude: splitCoord[0],
                          longitude: splitCoord[1],
                          latitudeDelta: 0.001,
                          longitudeDelta: 0.0018,
                        })
                      }}
                    >
                      <View
                        style={pin[3] ? styles.markerContainerSelected : styles.markerContainer}
                      >
                        <Icon name={pin[2]} size={pin[3] ? 18 : 12} type={'material-community'} color={icon_light}></Icon>
                      </View>
                    </Marker>
                  )
                })}
            </MapView>

            <Button
              buttonStyle={styles.pinModalButton}
              titleStyle={{ fontSize: 18 }}
              onPress={toggleOverlay}
            >
              <Icon name="pin-drop" size={32} type={'material-icons'} color={icon_light}></Icon>
            </Button>
          </View>
        </>

      )
    }
    else {
      return (
        <>
          <Text style={styles.searchText}>Searching For "{value}"</Text>
          <ScrollView style={styles.searchResultContainer}>
            {results.map((result, i) =>
              <Button key={i} buttonStyle={styles.button} onPress={() => {
                setSelected(result[0].name);
                setIcon(result[1]);
                let coordinates = result[0].coords.split(", ");
                Keyboard.dismiss();
                setValue("");
                setLocation({
                  latitude: coordinates[0] * 1.0,
                  longitude: coordinates[1] * 1.0,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.0018,
                })
              }}>{result[0].name}</Button>
            )}
          </ScrollView>
        </>
      )
    }
  }

  return (
    <>
      <SafeAreaView style={styles.page}>

      <Header props={props}/>

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlayContainer}
        >
          <View style={styles.overlayHeaderContainer}>
            <Icon name="pin-drop" style={styles.overlayTitleIcon} size={28} type={'material-icons'} color={icon_dark}></Icon>
            <Text style={styles.overlayTitle}>Enabled Icons</Text>
            <Icon style={styles.closeOverlayIcon} onPress={toggleOverlay} name="close" size={34} color={icon_dark}></Icon>
          </View>

          <ScrollView>
            {renderCheckBox("Academics and Administrative", 0)}
            {renderCheckBox("Athletics and Recreation", 1)}
            {renderCheckBox("ATM Locations", 2)}
            {renderCheckBox("Bridges", 3)}
            {renderCheckBox("Dining and Retail", 4)}
            {renderCheckBox("Health and Safety", 5)}
            {renderCheckBox("Facility and Auxiliary Services", 6)}
            {renderCheckBox("Music, Theatre, and Art", 7)}
            {renderCheckBox("Residences", 8)}
            {renderCheckBox("Student Life", 9)}
            {renderCheckBox("Oakes Museum", 10)}
            {renderCheckBox("Parking Lots", 11)}
          </ScrollView>
        </Overlay>

        <View style={styles.app_container}>
          {handleSearchChange()}
        </View>

        <KeyboardAvoidingView style={styles.search_container} behavior="position">
          <SearchBar
            platform="ios"
            containerStyle={{ backgroundColor: accent3 }}
            inputContainerStyle={{ backgroundColor: bg_default, }}
            onChangeText={updateSearch}
            placeholder="Search in Maps"
            placeholderTextColor={title_mid}
            value={value}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: bg_default
  },
  page: {
    backgroundColor: accent3,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  search_container: {
    backgroundColor: accent3,
    minHeight: 70,
  },
  searchText: {
    color: title_dark,
    fontSize: 20,
    padding: 20
  },
  searchResultContainer: {
    flex: 1
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: accent1
  },
  selectedHeader: {
    backgroundColor: accent1,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectedTitle: {
    fontSize: 18,
    paddingLeft: 14,
    flex: 2,
    color: title_light,
    fontWeight: '600'
  },
  closeHeaderContainer: {
    paddingRight: 20
  },
  map: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  selectedIcon: {
    paddingLeft: 14
  },
  markerContainer: {
    height: 24,
    width: 24,
    borderRadius: 20,
    backgroundColor: accent3,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  markerContainerSelected: {
    height: 34,
    width: 34,
    borderRadius: 20,
    backgroundColor: accent3,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  pinModalButton: {
    backgroundColor: accent1,
    height: 60,
    width: 60,
    margin: 16,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    alignSelf: 'flex-end'
  },
  overlayContainer: {
    width: '80%'
  },
  closeOverlayIcon: {
    alignContent: 'center',
    flex: 1
  },
  checkboxBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    marginRight: 0
  },
  overlayTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  overlayHeaderContainer: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: title_mid
  },
  overlayTitleIcon: {
    marginHorizontal: 8
  }
});
