import { StyleSheet, View, Image, SafeAreaView, Text, KeyboardAvoidingView, Keyboard, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon, CheckBox } from "@rneui/themed";
import AnimatedInput from "react-native-animated-input";
import { useAuthMutation, useCypherMutation, useDataMutation } from '../../api/apiSlice'
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../api/authSlice";
import AppLoader from '../js_comp/AppLoader'
import { normalize } from '../../fileTextsizing';
import BackButton from "../../utils/components/backButton";

import { accent1, accent1_alt, accent3, bg_default, icon_dark, icon_light, title_dark, title_light } from '../../utils/assets/data'
//import { authenticateWithFirebase } from '../src/firebaseAuth'

// Using this package for the input fields
// https://www.npmjs.com/package/react-native-animated-input

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; goBack: Function; };
};

export default function Login(props: CompProps) {

  const [username, handleChange1] = useState("");
  const [password, handleChange2] = useState("");
  const [check, setCheck] = useState(false);
  const [loginPending, setLoginPending] = useState(false);
  const [errorText, setErrorText] = useState('')
  const [showErrorText, setShowErrorMessage] = useState(false); 
  const dispatch = useAppDispatch();

  // Calling Messiah API to get encrypted string 
  const [cyphper, {
    data: cypherData,
    isSuccess: isCypherSuccess,
  }] = useCypherMutation();

  // Calling Messiah API to get session token 
    const [auth, {
      data: loginData,
      isError:isLoginError,
      isSuccess: isLoginSuccess,
      error: loginError
    }] = useAuthMutation();

  // For show/hide password field
  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => {
    setHidden(!hidden);
  };

  // Handles user submit username and password
  const handleLogin = async () => {
    if (username && password) {
      setLoginPending(true);
      setShowErrorMessage(false);
      // call to messiah API to encrypt password
      await cyphper(password)
    } else { // if there is a missing field show error
      setErrorText('Please enter username and password');
      setShowErrorMessage(true);
    }
  }

  // Hide error message when user is changing input
  useEffect(() => {
     setShowErrorMessage(false);
  }, [username])
  useEffect(() => {
    setShowErrorMessage(false);
  }, [password])  

  // Take encrypted cypher and make call to messiah API to authenticate
  useEffect(() => {
    if (isCypherSuccess) {
      auth({ userId: username, encryptedPwd: cypherData })
    }
  }, [isCypherSuccess])

  // If there is a login error set the error message to wrong pwd
  useEffect(() => {
    if(isLoginError) {
      setLoginPending(false);
      setErrorText('Wrong username or password');
      setShowErrorMessage(true);
    }
  }, [isLoginError])

  // If Login is success set User state
  useEffect(() => {
    if (isLoginSuccess) {
      // Setting user state including name, token and cypher
      //authenticateWithFirebase(username);
      dispatch(setUser({ name: username, token: loginData, cypher: cypherData })); 
      // Navigate to home page
      props.navigation.navigate('Home')
    }
  }, [isLoginSuccess])

  return (
    <>
      <Pressable style={styles.page} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <LinearGradient
            colors={[accent1, accent1_alt]}
            style={styles.background}>
            <SafeAreaView style={styles.background}>
              <Image source={require('../../utils/assets/images/messiah_logo.png')} style={styles.logo} />
            </SafeAreaView>
            <BackButton props={props} iconColor={icon_light}/>
          </LinearGradient>
          <View style={styles.login_container}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.input_container}>
              <View>
                <AnimatedInput
                  placeholder="Username"
                  errorText="Error"
                  autoCapitalize='none'
                  value={username}
                  onChangeText={handleChange1}
                  styleLabel={{ fontWeight: "600" }}
                  styleBodyContent={{ borderBottomWidth: 1.5 }}
                  styleInput={styles.input_field}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <AnimatedInput
                    placeholder="Password"
                    errorText={errorText}
                    valid={!showErrorText}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={handleChange2}
                    styleLabel={{ fontWeight: "600" }}
                    styleBodyContent={{ borderBottomWidth: 1.5, marginRight: 12 }}
                    styleInput={styles.input_field}
                    secureTextEntry={hidden}
                  />
                </View>
                <Pressable
                  onPressIn={toggleHidden}
                  onPressOut={toggleHidden}
                  style={{ flex: 0.1, justifyContent: 'center' }}>
                  <Icon name="eye-off-outline" type="ionicon" size={24} color={icon_dark}></Icon>
                </Pressable>
              </View>
              <View style={styles.bottom_text_container}>
                <CheckBox
                  title="Save User Information"
                  checked={check}
                  onPress={() => setCheck(!check)}
                  //iconRight
                  containerStyle={{ alignSelf: 'flex-start', margin: 0, padding: 0, flex: 1 }}
                  textStyle={{ fontSize: 14, fontWeight: '400' }}
                />
                <Pressable onPress={() => alert('Forgot Password Screen')} style={{ justifyContent: 'center' }}>
                  <Text style={styles.forgot_text}>Forgot?</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <SafeAreaView>
          <View style={{ flex: 1 }}>
            <Button
              title="Log In"
              buttonStyle={styles.button}
              containerStyle={styles.button_container}
              titleStyle={{ fontSize: 18, color: title_light }}
              onPress={() => handleLogin()}
            />
          </View>
        </SafeAreaView>
      </Pressable>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bg_default
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  login_container: {
    flex: 1,
    backgroundColor: bg_default,
    minHeight: 100,
    alignContent: 'center'
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    alignSelf: 'center',
    margin: 40,
    color: title_dark
  },
  error: {
    alignSelf: 'center',
    color: 'red'
  },
  button: {
    backgroundColor: accent3,
    width: '100%',
    borderRadius: 30,
    height: 50
  },
  button_container: {
    bottom: 0,
    position: 'absolute',
    marginBottom: 30,
    width: '85%',
    alignSelf: 'center'
  },
  input_container: {
    width: '85%',
    alignSelf: 'center'
  },
  forgot_text: {
    fontWeight: '600',
    fontSize: 15,
    alignSelf: 'flex-end'
  },
  bottom_text_container: {
    flexDirection: 'row'
  },
  input_field: {
    height: 24
  }
});
