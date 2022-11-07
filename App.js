import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './src/api/apiSlice';
import { Provider } from 'react-redux';
import { store } from './src/app/store'



// Import screens to use for navigation
import Home from './screens/home';
import Index from './screens/index';
import Chapel from './screens/chapel';
import Settings from './screens/profile_popup';
import UnionMenu from './screens/union_menu';
import FalconMenu from './screens/falcon_menu';
import Login from './screens/login';
import Gym from './screens/gym';
import DiningDollars from './screens/dining_dollars';
import FalconDollars from './screens/falcon_dollars';
import LottieMenu from './screens/lottie_menu';

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
  return (
    <Provider store={store}>
    <ApiProvider api={apiSlice}>
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
        <Stack.Screen name = "LottieMenu" component = {LottieMenu} />
        <Stack.Screen name = "Settings" component = {Settings} 
            options={{ fullScreenGestureEnabled: true, presentation: 'transparentModal', gestureDirection: 'horizontal', animation: 'fade'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ApiProvider>
    </Provider>
  );
}




// CAS Authentication
const cas = useCas();

