import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './src/api/apiSlice';
import { Provider } from 'react-redux';
import { store } from './src/app/store'
import { useAppDispatch } from './src/app/hooks';


// Import screens to use for navigation
import Home from './src/assets/screens/home';
import Index from './src/assets/screens/index';
import Chapel from './src/assets/screens/chapel';
import Settings from './src/assets/screens/Components/profile_popup';
import UnionMenu from './src/assets/screens/union_menu';
import FalconMenu from './src/assets/screens/falcon_menu';
import Login from './src/assets/screens/login';
import Gym from './src/assets/screens/gym';
import DiningDollars from './src/assets/screens/dining_dollars';
import FalconDollars from './src/assets/screens/falcon_dollars';
import LottieMenu from './src/assets/screens/lottie_menu';
import Library from './screens/library';
import TestPage from './screens/dataRerenderingPage';
import Events from './screens/events';
import Reporting from './screens/reporting';
import Allergies from './src/assets/screens/allergies';
import Map from './src/assets/screens/map';




// Import Cas
import useCas from "./src/cas/useCas";
//import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

const Stack = createNativeStackNavigator();

/* Structure will be:

    <Stack.Screen ... />

    for each screen. Must be imported above first.
    See documentation: 
    https://reactnavigation.org/docs/native-stack-navigator/
    https://reactnavigation.org/docs/nesting-navigators/

    The top of the stack is the default page.
*/




export default function App() {
  //const dispatch = useAppDispatch();
  //const user = JSON.parse(localStorage.getItem("user") || "{}")
  /**
  useEffect(() => {
    dispatch(setUser(user));
  },[]
  )*/
  return (
    
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name = "Home" component = {Home} />
        <Stack.Screen name = "Index" component = {Index} />
        <Stack.Screen name = "Chapel" component = {Chapel} />
        <Stack.Screen name = "UnionMenu" component = {UnionMenu} />
        <Stack.Screen name = "FalconMenu" component = {FalconMenu} />
        <Stack.Screen name = "Login" component = {Login} />
        <Stack.Screen name = "Gym" component = {Gym} />
        <Stack.Screen name = "FalconDollars" component = {FalconDollars} />
        <Stack.Screen name = "DiningDollars" component = {DiningDollars} />
        <Stack.Screen name = "TestPage" component = {TestPage} />
        <Stack.Screen name = "Reporting" component = {Reporting} />

        <Stack.Screen name = "LottieMenu" component = {LottieMenu} />
        <Stack.Screen name = "Library" component = {Library} />
        <Stack.Screen name = "Events" component = {Events} />

        <Stack.Screen name = "Allergies" component = {Allergies} />
        <Stack.Screen name = "Map" component = {Map} />
        <Stack.Screen name = "Settings" component = {Settings} 
            options={{ fullScreenGestureEnabled: true, presentation: 'transparentModal', gestureDirection: 'horizontal', animation: 'slide'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </ApiProvider>
  );
}




// CAS Authentication
const cas = useCas();

