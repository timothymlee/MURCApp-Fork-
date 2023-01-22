import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from 'react';

type CompProps = {
  navigation: { navigate: Function;};
};

export default function Login(props: CompProps) {
  return (
    <>
      <ImageBackground source={require("../assets/images/splash_1.png")} resizeMode="cover" style={styles.something}>
        <View style={styles.container}>
          <View style={[styles.something, styles.something]}>
            <Text style={styles.something}>Unitivity Login</Text>
            <TextInput
            placeholderTextColor="#000" 
            style={styles.something}
            placeholder="EMAIL"
            />
            <TextInput
            secureTextEntry={true}
            placeholderTextColor="#000" 
            style={styles.something}
            placeholder="PASSWORD"
            />
            <Pressable  onPress={()=>{props.navigation.navigate('ForgotPassword')}}>
              <Text style={styles.something}>Forgot Your Password?</Text>
            </Pressable>
            <Pressable style={styles.something} onPress={()=>{props.navigation.navigate('Explore')}}>
              <Text style={styles.something}>Login</Text>
            </Pressable>
            <Pressable style={styles.something} onPress={()=>{ props.navigation.navigate('SignUp')}}>
              <Text style={styles.something}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  something: {}
});
