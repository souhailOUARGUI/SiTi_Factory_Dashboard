import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { StackActions } from 'react-navigation'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { Checkbox } from 'react-native-paper'

import axios from 'axios'
const { height, width } = Dimensions.get('window')

const baseUrl = 'http://gounane.ovh:8000/api/v1'

const NewLogin = ({ navigation }) => {
  const data = {
    email: 'super_admin@siti.com',
    password: 'sititea1234',
  }
  //   ***************** states *****************
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')
  //const [emailValid,setEmailValid] = useState(false);
  //const [passwordValid,setPasswordValid] = useState(false);

  //      ***************** remember Me handler *****************
  /* const rememberMeHandler = () => {
    console.log('remember me pressed')
  } */

  //      ***************** forgot password handler *****************
  const forgotPasswordHandler = () => {
    console.log('forgot password pressed')
    // send axios post method to forgot password api
    axios
      .post(`${baseUrl}/users/forget-password`, { email: email })
      .then(response => {
        console.log(response.data)
        if (response.data.status === 'success') {
          //styled popup message to check email
          alert('Check your email for password reset link')
        } else {
          alert('Email not found')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  //                *****************login handler *****************
  const loginHandler = async () => {
    setEmailError('');
    setPassError('');
    // validate email
    // if(!isValidEmail(email)){
    //   setEmailError('Invalid Email');
    //   return;
    // }
    // // validate password
    // if(!isValidPassword(pass)){
    //   setPassError('Invalid Password');
    //   return;
    // }

    console.log('login pressed');

    axios
      .post(`${baseUrl}/users/login`, data)
      .then(response => {
        console.log(response.data)
        const token = response.data.token
        if (token) {
          try {
            AsyncStorage.setItem('token', token)
            console.log('token saved in async storage')
            // saveCredentials(email,pass);
            navigation.navigate('MachineStats')
          } catch (error) {
            console.log('error saving token in async storage', error)
          }
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  

  useEffect(() => {
    // checkAuth
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          console.log('token found in async storage')
          navigation.navigate('MachineStats')
        } else {
          console.log('token not found in async storage')
        }
      } catch (error) {
        console.log('error getting token from async storage', error)
      }
    }
    checkAuthentication();
    // getCredentials();
  }, [])

  // email validation method for email textInput
  // const validateEmail = (email) => {
  //   console.log('validate email called');
  //   // regex for email validation
  //   const regex = /\S+@\S+\.\S+/;
  //   if(regex.test(email)){
  //     setEmailValid(true);
  //   }else{
  //     setEmailValid(false);
  //   }
  // }
  // //email field validation
  // useEffect(() => {
  //   validateEmail(email);
  // }, [email])

  //validate password method for password textInput
  // const validatePassword = (pass) => {
  //   console.log('validate password called');
  //   // regex for password validation
  //   const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   if(regex.test(pass)){
  //     setPasswordValid(true);
  //   }else{
  //     setPasswordValid(false);
  //   }
  // }

  //           ****************** validations   ******************

  const isValidEmail = email => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.trim() !== ''
  }

  const isValidPassword = password => {
    // Password validation logic
    // Example: Password must be at least 6 characters long
    return password.length >= 6
  }


    //            *****************save credentials in async storage*****************
    const saveCredentials = async (email,pass) => {
      try {
        if (rememberMe) {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('pass', pass);
        }} catch (error) {
        console.log('error saving credentials in async storage', error);
        }
      }
      //            *****************get credentials from async storage*****************
      /* const getCredentials = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          const storedPass = await AsyncStorage.getItem('pass');
          if(storedEmail && storedPass){
            setEmail(storedEmail);
            setPass(storedPass);
            setRememberMe(true);
          }
        } catch (error) {
          console.log('error getting credentials from async storage', error);
        }
      } */



  return (
    <ImageBackground
      source={require('../assets/images/green_surface_reduced.jpg')}
      blurRadius={10}
      style={{ flex: 1 }}
    >
      <ScrollView
      style={{flex:1}}
      >
        <View
          style={{
            marginTop: 40,
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image
              resizeMode='center'
              source={require('../assets/images/Logo-Siti-blanc.png')}
              style={{
                marginTop: '15%',
                width: width - 5,
                height: height / 4,
                top: '5%',
              }}
            />
            <Text
              style={{
                fontSize: 50,
                fontWeight: '700',
                marginTop: '20%',
                color: 'white',
                // marginBottom:'10%'
              }}
            >
              SITI-SCADA
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                marginBottom: '10%',
                color: 'white',
              }}
            >
              Supervisory Control And Data Acquisition
            </Text>

            {/* <View
              style={{
                marginTop: '10%',
              }}
            ></View> */}
            {/* textinputs for email and password  */}
            <View
              style={{
                width: width - 40,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 10,
                // marginTop: '%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <Icon name='mail' size={25} color='#598F7F' />
              <TextInput
                style={{
                  width: width - 100,
                  height: 50,
                  marginLeft: 10,
                  fontSize: 18,
                }}
                value={email}
                placeholder='Email ID'
                placeholderTextColor='#598F7F'
                onChangeText={e => {
                  setEmail(e)
                  console.log(email)
                }}
              />
            </View>
            {/* email validation error message  */}
            {/* {emailValid ? null : (
              <Text style={{color:'red',fontSize:12,marginLeft:20}}>Invalid Email</Text>
            )} */}
            {emailError !== '' ? (
              <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>
                {emailError}
              </Text>
            ) : null}

            <View
              style={{
                width: width - 40,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <Icon name='lock' size={25} color='#598F7F' />
              <TextInput
                style={{
                  width: width - 100,
                  height: 50,
                  marginLeft: 10,

                  fontSize: 18,
                }}
                value={pass}
                placeholder='Password'
                placeholderTextColor='#598F7F'
                onChangeText={pass => {
                  // validatePassword(pass);
                  setPass(pass)
                  console.log(pass)
                }}
                secureTextEntry={passwordHidden}
              />

              {/* wrap eye icon with a pressable */}
              <Pressable
                onPress={() => {
                  passwordHidden
                    ? setPasswordHidden(false)
                    : setPasswordHidden(true)
                }}
                style={{
                  position: 'absolute',
                  right: 10,
                }}
              >
                <Icon
                  name={passwordHidden ? 'eye' : 'eyeo'}
                  size={25}
                  color='#598F7F'
                />
              </Pressable>
            </View>
            {/* password validation error message */}
            {/* {passwordValid ? null : (
              <Text style={{color:'red',fontSize:12,marginLeft:20}}>Invalid Password</Text>
            )} */}
            {passError !== '' ? (
              <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>
                {passError}
              </Text>
            ) : null}

            {/* remember me  */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: width - 40,
                height: 50,
                marginBottom: 5,
                paddingHorizontal: 5,
              }}
            >
              <Checkbox
                status={rememberMe ? 'checked' : 'unchecked'}
                onPress={() => {
                  setRememberMe(!rememberMe);
                }}
                color='#F6F6C9'
                uncheckedColor='#F6F6C9'
              />
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                Remember me
              </Text>
              {/*  forgot password inside a pressable*/}
              <Pressable
                onPress={() => {
                  forgotPasswordHandler()
                }}
                style={{
                  position: 'absolute',
                  right: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontStyle: 'italic',
                    fontWeight: '600',
                  }}
                >
                  Forgot Password?
                </Text>
              </Pressable>
            </View>

            {/* <Input
              style={{ padding: 1, color: 'white' }}
              placeholderTextColor={'white'}
              placeholder='Email ID'
              onSubmitEditing={() => Keyboard.dismiss()}
              onChangeText={e => setEmail(e)}
              leftIcon={
                <Icon
                  name='mail'
                  size={25}
                  style={
                    {
                      // margin:10
                    }
                  }
                  color='white'
                />
              }
            />

            <Input
              style={{
                color: 'white',
              }}
              placeholder='Password'
              onChangeText={pass => setPass(pass)}
              secureTextEntry={true}
              placeholderTextColor={'#F5FEFD'}
              leftIcon={
                <Icon
                  name='lock'
                  size={25}
                  style={{
                    margin: 0,
                  }}
                  color='white'
                />
              }
            /> */}

            {/* /////    Remember me       ///// */}
            {/* <View style={{
    alignItems:'flex-start',
    flexDirection: 'row',
    justifyContent:'flex-start'
  }} >
<Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
    <Text style={{
        paddingVertical:10,
        fontWeight:'600'  ""
    }}>
        Remember me
    </Text>
  </View> */}

            <Pressable
              onPress={loginHandler}
              style={{
                marginTop: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 4,
                elevation: 3,
                backgroundColor: '#598F7F',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,

                elevation: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21,
                  fontWeight: 'bold',
                  letterSpacing: 0.25,
                  color: 'white',
                }}
              >
                LOG IN
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default NewLogin
