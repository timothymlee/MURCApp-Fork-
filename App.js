import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens to use for navigation
import Home from './screens/home';
import Index from './screens/index';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { getDatabase, ref, onValue } from 'firebase/database';

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function readUserData(userId) {
  const db = getDatabase();
  const ref = db.ref('users/');
  console.log(ref.once('userId'), function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();

      console.log("Key: " + childKey + ", Val: " + childData);
    });
  });
}
