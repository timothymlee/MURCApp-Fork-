import { ImageBackground, Pressable, StyleSheet, SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import React from 'react';
import { Icon, SearchBar, Button } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {readUserData, writeUserData} from "../src/firebaseCalls";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};

export default function Home(props: CompProps) {
  const [value, setValue] = React.useState("");

  return (
    <>
      <SafeAreaView style={styles.page}>
        <View style={styles.header}>
          <View style={[styles.header_content, { alignItems: 'flex-start' }]}>
            <Pressable>
              <Icon name="person" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
          <View style={[styles.header_content, { alignItems: 'center' }]}>
            <Text style={{ color: 'white', fontSize: 32 }}>MU</Text>
          </View>
          <View style={[styles.header_content, { alignItems: 'flex-end' }]}>
            <Pressable onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home" style={styles.header_icons} size={44} color={'white'}></Icon>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.app_container}>
          <Button
              title="Get Data"
              loading={false}
              loadingProps={{ size: 'small', color: 'white' }}
              buttonStyle={{
                backgroundColor: 'rgba(111, 202, 186, 1)',
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 10,
                height: 50,
                width: 200,
                marginVertical: 10,
              }}
              onPress={() => readUserData('tl1261')}
          />
        </ScrollView>

        <KeyboardAvoidingView style={styles.search_container} behavior="position">
          <SearchBar
            platform="ios"
            containerStyle={{ backgroundColor: "#1E293B" }}
            inputContainerStyle={{ backgroundColor: '#F3F3F3',  }}
            inputStyle={{}}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
            loadingProps={{}}
            onChangeText={newVal => setValue(newVal)}
            placeholder="Search"
            placeholderTextColor="#888"
            value={value}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  app_container: {
    backgroundColor: '#CCC',
    flex: 1
  },
  header: {
    backgroundColor: '#1E293B',
    flex: 0.1,
    flexDirection: 'row'
  },
  search_container: {
    backgroundColor: '#1E293B',
    flex: 0.14
  },
  page: {
    backgroundColor: '#1E293B',
    flex: 1
  },
  header_content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  header_icons: {
    color: 'white'
  }
});
