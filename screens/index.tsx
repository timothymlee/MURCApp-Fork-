import { StyleSheet, Button, View } from "react-native";
import React, { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

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

  return (
    <>
      <View style={styles.container}>
        <Button title="eats" onPress={_handlePressButtonAsync} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
