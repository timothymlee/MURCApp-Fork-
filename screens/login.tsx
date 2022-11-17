import { StyleSheet, View, Image, SafeAreaView, Text, KeyboardAvoidingView, Keyboard, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon, CheckBox } from "@rneui/themed";
import AnimatedInput from "react-native-animated-input";
import { useAuthMutation, useCypherMutation, useDataMutation } from '../src/api/apiSlice'
import { useAppDispatch } from "../src/app/hooks";
import { setUser } from "../src/api/authSlice";
import AppLoader from '../src/js componets/AppLoader'

// Using this package for the input fields
// https://www.npmjs.com/package/react-native-animated-input

type CompProps = {
  // We are only using the navigate and goBack functions
  navigation: { navigate: Function; };
};


export default function Login(props: CompProps) {

  const [username, handleChange1] = useState("");
  const [password, handleChange2] = useState("");
  const [encryptpwd, setpwd] = useState('');
  const [check, setCheck] = useState(false);
  const [loginPending, setLoginPending] = useState(false);
  const [errorText, setErrorText] = useState('')
  const [showErrorText, setShowErrorMessage] = useState(false); 
  const dispatch = useAppDispatch();



  const [auth, {
    data: loginData,
    isError:isLoginError,
    isSuccess: isLoginSuccess,
    error: loginError
  }] = useAuthMutation();


  const [cyphper, {
    data: cypherData,
    isSuccess: isCypherSuccess,
  }] = useCypherMutation();


  // For show/hide password field
  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => {
    setHidden(!hidden);
  };

  //once login is clicked show loading animation and start with 
  const handleLogin = async () => {
    if (username && password) {
      setLoginPending(true);
      setShowErrorMessage(false);
      await cyphper(password)
    } else {
      console.log('error')
      setErrorText('Please enter username and password');
      setShowErrorMessage(true);
    }
  }

  //hide error message when user is changing input
  useEffect(() => {
     setShowErrorMessage(false);
  }, [username])
  useEffect(() => {
    setShowErrorMessage(false);
  }, [password])  

  useEffect(() => {
    if (isCypherSuccess) {
      setpwd(cypherData)
      auth({ userId: username, encryptedPwd: cypherData })
    }
  }, [isCypherSuccess])

  useEffect(() => {
    if(isLoginError) {
      setLoginPending(false);
      setErrorText('Wrong username or password');
      setShowErrorMessage(true);
      console.log(loginData);
    }
  }, [isLoginError])

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setUser({ name: username, token: loginData, cypher: cypherData }))
      props.navigation.navigate('Home')
    }
  }, [isLoginSuccess])

  return (
    <>
      <Pressable style={styles.page} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <LinearGradient
            colors={['#5DAEF8', '#4C8ECA']}
            style={styles.background}>
            <SafeAreaView style={styles.background}>
              <Image source={require('../assets/images/messiah_logo.png')} style={styles.logo} />
            </SafeAreaView>
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
                  <Icon name="eye-off-outline" type="ionicon" size={24} color={'black'}></Icon>
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
              titleStyle={{ fontSize: 18 }}
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
    backgroundColor: 'white'
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  login_container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: 100,
    alignContent: 'center'
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    alignSelf: 'center',
    margin: 40
  },
  error: {
    alignSelf: 'center',
    color: 'red'
  },
  button: {
    backgroundColor: '#1E293B',
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
