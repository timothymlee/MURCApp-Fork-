import { Pressable, Text, StyleSheet, SafeAreaView, View, Platform, StatusBar, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import { Icon, SearchBar, Button, Overlay } from "@rneui/themed";
import { BackgroundImage, Image, CheckBox } from "@rneui/base";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { current } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Map(props: CompProps) {

  let AcademicsAndAdministrative = [
    { name: "Admissions Office", coords: "40.157583, -76.989482" },
    { name: "Alumni and Parent Relations", coords: "40.157947, -76.989222" },
    { name: "Archives", coords: "40.156545, -76.988230" },
    { name: "Boyer Hall", coords: "40.156745, -76.989602" },
    { name: "Bretheren in Christ Offices", coords: "40.16118054610895, -76.98818737765542" },
    { name: "Calvin and Janet High Center for Worship and Performing Arts", coords: "40.15631336663663, -76.9918386787665" },
    { name: "Career and Professional Development Center", coords: "40.15793292598861, -76.98920553344803" },
    { name: "Climenhaga Building", coords: "40.15624913863643, -76.99134659097146" },
    { name: "Conference and Event Services", coords: "40.15805342115122, -76.98946368470592" },
    { name: "Development Office", coords: "40.15708584559677, -76.9910786930923" },
    { name: "Eisenhower Campus Center", coords: "40.15835146633821, -76.98923309440427" },
    { name: "Falcon Exchange", coords: "40.15808461851344, -76.98918388641597" },
    { name: "Financial Aid", coords: "40.15765309277862, -76.98932649772324" },
    { name: "Frey Hall", coords: "40.15730609070767, -76.98738523756141" },
    { name: "Human Resources and Compliance", coords: "40.15715934176684, -76.99100694987915" },
    { name: "Information Technology Servies", coords: "40.15715934176684, -76.99100694987915" },
    { name: "Jordan Science Center", coords: "40.15786218271985, -76.98701368345688" },
    { name: "Kim S. Phipps Admissions and Welcome Center", coords: "40.157587882845995, -76.98946656907734" },
    { name: "Kline Hall of Science", coords: "40.15749045792473, -76.98699933443996" },
    { name: "Marketing and Communications", coords: "40.15721237262202, -76.9911043561943" },
    { name: "McBeth Advancement Center", coords: "40.15629967686645, -76.99020273412565" },
    { name: "Murray Library", coords: "40.156789861036195, -76.98814176855487" },
    { name: "Old Main", coords: "40.15717478463214, -76.9910901060688" },
    { name: "President's Office", coords: "40.15717478463214, -76.9910901060688" },
    { name: "Provost's Office", coords: "40.15717478463214, -76.9910901060688" },
    { name: "Registrar's Office", coords: "40.15763833959881, -76.98948023545746" },
    { name: "Student Success and Engagement", coords: "40.15797775411594, -76.98924379215048" },
    { name: "Sustainability Office", coords: "40.15802803760218, -76.98897239633791" },
    { name: "The Ernest L. Boyer Center", coords: "40.156865510233914, -76.98950662756197" },
    { name: "Ticket Office", coords: "40.15809872620166, -76.98967984924107" },
    { name: "Climenhaga Homestead", coords: "40.15629967686645, -76.99020273412565" },
  ]

  let AthleticsAndRecreation = [
    { name: "Alumni Plaza", coords: "40.157867736366306, -76.98880603697522" },
    { name: "Anderson Field", coords: "40.153475509475875, -76.9879460830918" },
    { name: "Baseball Complex", coords: "40.154103237256514, -76.99243601398734" },
    { name: "Brubaker Auditorium", coords: "40.15820872108236, -76.98956882369131" },
    { name: "Criste Courts", coords: "40.15388076263342, -76.98684745342878" },
    { name: "Falcon Fitness Center", coords: "40.15899972418872, -76.98931677356242" },
    { name: "Fredericksen Natatorium (Pool)", coords: "40.158858303812295, -76.98909677847571" },
    { name: "Hitchcock Arena", coords: "40.15866660016567, -76.9884635215728" },
    { name: "Lacrosse Turf Field", coords: "40.15285844844709, -76.98654717777164" },
    { name: "Locker Rooms", coords: "40.159109433572056, -76.9887560206736" },
    { name: "Practice Fields", coords: "40.15308220153073, -76.98556187207926" },
    { name: "Racquetball Courts", coords: "40.158917363159745, -76.98819323307808" },
    { name: "Recreational Sports Fields", coords: "40.1595510513026, -76.99047105483486" },
    { name: "Shoemaker Field", coords: "40.153726006355996, -76.98970662798527" },
    { name: "Softball Field (Starry Field)", coords: "40.15465349232892, -76.99037554251346" },
    { name: "Sollenberger Sports Center", coords: "40.15889479259245, -76.988831130477" },
    { name: "Stabler Fitness Trail", coords: "40.15566477332862, -76.99090288536938" },
    { name: "Starry Athletic Fields Complex", coords: "40.15415488798856, -76.991274676834" },
    { name: "Wrestling Room", coords: "40.15848090025935, -76.98912814042878" },
    { name: "Basketball Court", coords: "40.16046848228034, -76.98672423363692" },
    { name: "North Volleyball Court", coords: "40.16003629790822, -76.98492561056601" },
    { name: "South Volleyball Court", coords: "40.15739640016905, -76.98375747176725" }
  ]

  let ATMLocations = [
    { name: "ATM - Eisenhower Campus Center", coords: "40.158004809761835, -76.98898414068769" },
    { name: "ATM - Larsen Student Union", coords: "40.15848831183473, -76.98583111193284" }
  ]

  let Bridges = [
    { name: "Covered Bridge", coords: "40.155285289386335, -76.99127021323368" },
    { name: "Swinging Bridge", coords: "40.155292138019334, -76.98841636058933" }
  ]

  let DiningAndRetail = [
    { name: "Cafe Diem", coords: "40.15667682773511, -76.98818393998978" },
    { name: "Campus Store", coords: "40.158212194493814, -76.98915614374968" },
    { name: "Dining Servies Office", coords: "40.15821517967555, -76.98935533180634" },
    { name: "Falcon Hut", coords: "40.15363763899888, -76.99132778539126" },
    { name: "Lottie Nelson Dining Hall", coords: "40.158163297192566, -76.98896691345526" },
    { name: "Martin Commons", coords: "40.15804588660583, -76.98853329467599" },
    { name: "Post Office", coords: "40.15819170295054, -76.98936336490003" },
    { name: "Private Dining Room", coords: "40.15798907496003, -76.98919982867471" },
    { name: "Textbook Express", coords: "40.158148147452195, -76.98894709087193" },
    { name: "The Falcon", coords: "40.15805156776926, -76.9890313368062" },
    { name: "Union Cafe", coords: "40.158575212015705, -76.98591890516757" }
  ]

  let HeathAndSafety = [
    { name: "Department of Safety", coords: "40.160344181078294, -76.9890713897092" },
    { name: "Dispatch Office", coords: "40.15810492101795, -76.98977319344269" },
    //{ name: "Emergency Phone", coords: "0-0" },
    { name: "Engle Center", coords: "40.158295465724294, -76.98703003827742" }
  ]

  let FacilityAndAuxiliaryServices = [
    { name: "Bowmansdale Building", coords: "40.16471236549861, -76.98242403583525" },
    { name: "CCHP (cooling, heat, and power plant)", coords: "40.15868286156901, -76.98767144146599" },
    { name: "Lenhert Maintenance Building", coords: "40.15556330563859, -76.99419849597652" },
    { name: "University Press", coords: "40.16471236549861, -76.98242403583525" }
  ]

  let MusicTheatreAndArt = [
    { name: "Auginbaugh Art Gallery", coords: "40.1562692424131, -76.9914429073492" },
    { name: "Grace E. Pollock Dance Studio", coords: "40.15618796287996, -76.99154013853914" },
    { name: "High Center Galleries", coords: "40.15626692014105, -76.9916951007478" },
    { name: "High Foundation Recital Hall", coords: "40.15604978744595, -76.99175131252828" },
    { name: "Miller Theater", coords: "40.15610900552501, -76.99136086853612" },
    { name: "Parmer Cinema", coords: "40.1563892856309, -76.98950534337" },
    { name: "Parmer Hall", coords: "40.1560555839192, -76.99205299736204" },
    { name: "Poorman Black Box Theater", coords: "40.1561914370634, -76.99165799565287" }
  ]

  let Residences = [
    { name: "Bittner Residence", coords: "40.1565380572924, -76.98579539856992" },
    { name: "Fry Residence", coords: "40.15941626982902, -76.98559641235269" },
    { name: "Grantham Residence", coords: "40.15913502386091, -76.98678264816193" },
    { name: "Hess Residence", coords: "40.15901875423921, -76.98627073703375" },
    { name: "Kelly Residence", coords: "40.15942569704984, -76.98474528300947" },
    { name: "Mellinger Residence", coords: "40.15711423695222, -76.98432655820166" },
    { name: "Mountain View Residence", coords: "40.156967728935335, -76.98590300179261" },
    { name: "Naugle Residence", coords: "40.16027027754189, -76.98613421743457" },
    { name: "Orchard Hill", coords: "40.16370596465502, -76.99086578190762" },
    { name: "Rafiki House", coords: "40.158620353678145, -76.98515756118049" },
    { name: "Reconciliation (Bertram) House", coords: "40.1528885491439, -76.9904812061662" },
    { name: "Restoration House", coords: "40.15735227537834, -76.99228675987194" },
    { name: "Smith Residence", coords: "40.159635239049116, -76.98757607657856" },
    { name: "Sollenberger Residence", coords: "40.15722128017081, -76.9852097903229" },
    { name: "Witmer Residence", coords: "40.156576851121415, -76.98399236875208" },
    { name: "Harbor House", coords: "40.15577941064205, -76.98689315575649" },
    { name: "Miller Residence", coords: "40.159531682786415, -76.98673406007418" }
  ]

  let StudentLife = [
    { name: "Agape Center", coords: "40.15804094615434, -76.98753028355215" },
    { name: "Campus Ministries", coords: "40.15653174759581, -76.98890770536079" },
    { name: "Disability Services", coords: "40.15683787752296, -76.98812664288552" },
    { name: "Fishbowl", coords: "40.159367562507036, -76.98635297175313" },
    { name: "Hostetter Chapel", coords: "40.1566141673275, -76.98918654620631" },
    { name: "Intercultural Office", coords: "40.15840589906136, -76.98571646868929" },
    { name: "Larsen Student Union", coords: "40.15859674055108, -76.98602400530395" },
    { name: "Student Activities Board (SAB)", coords: "40.158427196233006, -76.98583297621545" },
    { name: "Student Government Association (SGA)", coords: "40.15831063426874, -76.98575748891436" },
    { name: "The Learning Center", coords: "40.156887834475874, -76.98800263117299" },
    { name: "The Loft", coords: "40.15801999381752, -76.98490938003746" },
    { name: "The Pulse", coords: "40.158427196233006, -76.98583297621545" },
    { name: "Writing Center", coords: "40.15694584172471, -76.98812580519636" },
    { name: "Grantham Garden", coords: "40.15708077401567, -76.98642351280927" },
    { name: "Miller Meadow", coords: "40.159337893320505, -76.9872195078658" },
    { name: "Bittner Beach", coords: "40.15650883364112, -76.98657103429893" },
  ]

  let OakesMuseum = [
    { name: "Oakes Museum of Natural History", coords: "40.15767868475688, -76.98704522305184" }
  ]

  let ParkingLots = [
    { name: "The Pit Parking", coords: "40.161233187295096, -76.98478226145451" },
    { name: "A Lot - Student Parking", coords: "40.16069466058968, -76.98686357685888" },
    { name: "B Lot - Student Parking", coords: "40.16112307674466, -76.98543791325379" },
    { name: "C Lot - Student Parking", coords: "40.160643392620564, -76.98490065309699" },
    { name: "D Lot - Student Parking", coords: "40.16166337986042, -76.98375152746829" },
    { name: "F Lot - Student Parking", coords: "40.15968988093371, -76.98482959328938" },
    { name: "G Lot - Student Parking", coords: "40.15724418812636, -76.9841057303556" },
    { name: "H Lot - Student Parking", coords: "40.15589065320225, -76.9840812406222" },
    { name: "J Lot - Student Parking", coords: "40.156211586062085, -76.9857144335252" },
    { name: "TR Lot - Student Parking", coords: "40.15268434698068, -76.99132908950945" },
    { name: "P Lot - Commuter Parking", coords: "40.154560881312044, -76.99121853416142" },
    { name: "PI Lot - Commuter Parking", coords: "40.157509224593845, -76.98579773706454" },
    { name: "TT Lot - Employee Parking", coords: "40.1589742366443, -76.98789207345978" },
    { name: "UU Lot - Employee Parking", coords: "40.158322990079654, -76.98999388712133" },
    { name: "WW Lot - Employee Parking", coords: "40.15768974951373, -76.98627132517971" },
    { name: "XX Lot - Employee Parking", coords: "40.156769811939675, -76.98783144599157" },
    { name: "YY Lot - Employee Parking", coords: "40.15695796532203, -76.99057650069209" },
    { name: "ZZ Lot - Employee Parking", coords: "40.15683359546838, -76.99156319961406" },
    { name: "VV Lot - Visitor Parking", coords: "40.157674568137814, -76.99055067086216" },
  ]

  let AllLocations = [
    { category: AcademicsAndAdministrative, icon: 'book-open-page-variant' },
    { category: AthleticsAndRecreation, icon: 'shoe-cleat' },
    { category: ATMLocations, icon: 'currency-usd' },
    { category: Bridges, icon: 'bridge' },
    { category: DiningAndRetail, icon: 'food-fork-drink' },
    { category: HeathAndSafety, icon: 'shield-half-full' },
    { category: FacilityAndAuxiliaryServices, icon: 'wrench' },
    { category: MusicTheatreAndArt, icon: 'music' },
    { category: Residences, icon: 'home' },
    { category: StudentLife, icon: 'account' },
    { category: OakesMuseum, icon: 'leaf' },
    { category: ParkingLots, icon: 'car' }
  ]

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
          <Icon style={styles.selectedIcon} name={selectedIcon} size={22} type={'material-community'} color={'white'}></Icon>
          <Text style={styles.selectedTitle}>{selected}</Text>
          <Pressable style={styles.closeHeaderContainer} onPress={() => { setSelected("") }}>
            <Icon name="close" size={44} color={'white'}></Icon>
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
        checkedColor="#0F0"
        containerStyle={styles.checkboxBoxContainer}
        onIconPress={() => {
          let tempActive = categoriesActive;
          tempActive[num] = !tempActive[num];
          setActive(tempActive);
          setMarkers();
        }}
        size={32}
        uncheckedColor="#838383"
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
          pinsList.push([thisLocation.name, thisLocation.coords, thisIcon]);
        })
      }
      currentCategory++;
    })
    if (selected != "") {
      let alreadyDisplayed = false
      pinsList.map(function (pin) {
        if (pin[0] == selected) {
          alreadyDisplayed = true;
        }
      })
      if (!alreadyDisplayed) {
        // target icon should instead be whatever category it is from
        pinsList.push([selected, location.latitude + ", " + location.longitude, "target"])
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

                      coordinate={{ latitude: splitCoord[0]*1.0, longitude: splitCoord[1]*1.0 }}

                      coordinate={{ latitude: splitCoord[0] * 1.0, longitude: splitCoord[1] * 1.0}}
                      //icon={pin[2]}
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
                      <View style={styles.markerContainer}>
                        <Icon name={pin[2]} size={12} type={'material-community'} color={'white'}></Icon>
                      </View>
                    </Marker>
                  )
                })}
            </MapView>

            <Button
              title="Pins"
              buttonStyle={styles.pinModalButton}
              titleStyle={{ fontSize: 18 }}
              onPress={toggleOverlay}
            />
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
              <Button key={i} style={styles.button} onPress={() => {
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

        <View style={styles.header}>
          <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
            <Pressable onPress={() => props.navigation.navigate('Settings')}>
              <Icon name="person" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
          <View style={[styles.header_content, { alignItems: 'center' }]}>
            <Image source={require('../assets/images/messiah_logo.png')} style={styles.header_image} />
          </View>
          <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
        </View>

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlayContainer}
        >
          <Icon style={styles.closeOverlayIcon} onPress={toggleOverlay} name="close" size={44} color={'black'}></Icon>
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
            containerStyle={{ backgroundColor: "#1E293B" }}
            inputContainerStyle={{ backgroundColor: '#F3F3F3', }}
            onChangeText={updateSearch}
            placeholder="Search in Maps"
            placeholderTextColor="#888"
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
    backgroundColor: '#FBFBFB'
  },
  header: {
    backgroundColor: '#1E293B',
    minHeight: 60,
    flexDirection: 'row'
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header_content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  header_icons: {
    color: 'white'
  },
  header_image: {
    width: 120,
    height: 30,
    resizeMode: 'cover'
  },
  search_container: {
    backgroundColor: '#1E293B',
    minHeight: 70,
  },
  searchText: {
    color: 'black',
    fontSize: 20,
    padding: 20
  },
  searchResultContainer: {
    flex: 1
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  selectedHeader: {
    backgroundColor: '#54A6F2',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectedTitle: {
    fontSize: 18,
    paddingLeft: 14,
    flex: 2,
    color: 'white',
    fontWeight: '600'
  },
  closeHeaderContainer: {
    paddingRight: 20
  },
  map: {
    flex: 1,
    //margin: 20
  },
  selectedIcon: {
    paddingLeft: 14
  },
  markerContainer: {
    height: 22,
    width: 22,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  pinModalButton: {
    backgroundColor: '#54A6F2',
    height: 70,
    width: 70,
    margin: 16,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    right: 0,
    top: 0,
    //position: 'absolute'
  },
  overlayContainer: {
    width: '80%'
  },
  closeOverlayIcon: {
    alignItems: 'flex-end',
  },
  checkboxBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    marginRight: 0
  }
});
