import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from 'react';
import { Header, Icon, SearchBar } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function;};
};

export default function Home(props: CompProps) {
  const [value, setValue] = React.useState("");

  return (
    <>
        <View style={styles.page}>
          <Header
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={{
              text: "MU",
              style: { color: "#fff", fontSize: 30 }
            }}
            centerContainerStyle={{}}
            containerStyle={styles.header}
            leftComponent={{ icon: "person", color: "#fff", size: 40 }}
            leftContainerStyle={{}}
            linearGradientProps={{}}
            placement="center"
            rightComponent={{ icon: "home", color: "#fff", size: 40 }}
            rightContainerStyle={{}}
            statusBarProps={{}}
          />

          <View style={styles.app_container}>
          
          </View>
          
          <View style={styles.search_container}>
            <SearchBar
              platform="default"
              containerStyle={{backgroundColor: null}}
              inputContainerStyle={{backgroundColor: '#F3F3F3', margin: 10}}
              inputStyle={{}}
              leftIconContainerStyle={{}}
              rightIconContainerStyle={{}}
              loadingProps={{}}
              onChangeText={newVal => setValue(newVal)}
              placeholder="Search"
              placeholderTextColor="#888"
              value={value}
            />
          </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  app_container: {
    backgroundColor: '#CCC',
    flex: 7
  },
  header: {
    backgroundColor: '#1E293B',
    flex: 1
  },
  search_container: {
    backgroundColor: '#1E293B',
    flex: 1.5
  },
  page: {
    backgroundColor: 'red',
    flex: 1
  }
});
