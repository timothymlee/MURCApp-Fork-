import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './src/api/apiSlice';
import { Provider } from 'react-redux';
import { store } from './src/app/store'
import { useAppDispatch } from './src/app/hooks';


// Import screens to use for navigation
import Home from './src/core/vw/home';
import Chapel from './src/apps/chapel/vw/chapel';
import Settings from './src/core/vw/profile_popup';
import UnionMenu from './src/apps/union_menu/vw/union_menu';
import FalconMenu from './src/apps/falcon_menu/vw/falcon_menu';
import Login from './src/core/vw/login';
import Gym from './src/apps/gym/vw/gym';
import DiningDollars from './src/apps/dining_dollars/vw/dining_dollars';
import FalconDollars from './src/apps/falcon_dollars/vw/falcon_dollars';
import LottieMenu from './src/apps/lottie_menu/vw/lottie_menu';
import Library from './src/apps/library/vw/library';
import Events from './src/apps/events/vw/events';
import Reporting from './src/apps/reporting/vw/reporting';
import Allergies from './src/core/vw/allergies';
import Map from './src/apps/map/vw/map';

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
        <Stack.Screen name = "Chapel" component = {Chapel} />
        <Stack.Screen name = "UnionMenu" component = {UnionMenu} />
        <Stack.Screen name = "FalconMenu" component = {FalconMenu} />
        <Stack.Screen name = "Login" component = {Login} />
        
        <Stack.Screen name = "Gym" component = {Gym} />
        <Stack.Screen name = "FalconDollars" component = {FalconDollars} />
        <Stack.Screen name = "DiningDollars" component = {DiningDollars} />
        <Stack.Screen name = "Reporting" component = {Reporting} />
        <Stack.Screen name = "Library" component = {Library} />
        <Stack.Screen name = "Events" component = {Events} />

        <Stack.Screen name = "Allergies" component = {Allergies} />
        <Stack.Screen name = "Map" component = {Map} />
        <Stack.Screen name = "LottieMenu" component = {LottieMenu} />

        <Stack.Screen name = "Settings" component = {Settings} 
            options={{ fullScreenGestureEnabled: true, presentation: 'transparentModal', gestureDirection: 'horizontal', animation: 'fade'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </ApiProvider>
  );
}





