import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens to use for navigation
import Home from './screens/home';
import Index from './screens/index';

// Import Cas
import useCas from "./src/cas/useCas";

const Stack = createNativeStackNavigator();

/* Structure will be:

    <Stack.Screen ... />
    {props => (...)}

    for each screen. Must be imported above first.
    See documentation: https://reactnavigation.org/docs/native-stack-navigator/

    The top of the stack is the default page.
*/




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name = "Home" component = {Home} />
          {props => (<Home {...props} />)}
        <Stack.Screen name = "Index" component = {Index} />
          {props => (<Index {...props} />)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}




// CAS Authentication
const cas = useCas();

