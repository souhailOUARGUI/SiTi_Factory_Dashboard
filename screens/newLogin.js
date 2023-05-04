import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableWithoutFeedback,
    TextInput,
    Pressable,Keyboard } from 'react-native';
import React, { useState,useEffect } from 'react';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

import axios from 'axios';
const { height, width } = Dimensions.get("window");

const baseUrl = 'http://gounane.ovh:8000/api/v1';
 
const NewLogin = ({navigation}) =>{

  const [machineStates, setMachineStates] = useState([
    { id: 1, name: 'Machine 1', state: 'working', startHour: 8, endHour: 16 },
    { id: 2, name: 'Machine 2', state: 'not working', startHour: 8, endHour: 12 },
    { id: 3, name: 'Machine 3', state: 'working', startHour: 10, endHour: 14 },
    { id: 4, name: 'Machine 4', state: 'not working', startHour: 12, endHour: 16 },
  ]);




  const renderHour = (hour) => {
    // Render the hour as a string with a leading zero if needed
    return `${hour.toString().padStart(2, '0')}:00`;
  };

//////////////////////////////////
const renderMachineState = ({ item: machineState }) => {
  const stateColor = machineState.state === 'working' ? '#8DC63F' : '#FF0000';
  const hourItems = [];

  // Iterate over the hours and create a View for each hour
  for (let hour = machineState.startHour; hour <= machineState.endHour; hour++) {
    const hourItem = (
      <View key={hour} style={[styles.hourItem, { backgroundColor: stateColor }]} />
    );
    hourItems.push(hourItem);
  }

  return (
    <View style={styles.machineStateContainer}>
      <View style={styles.machineStateName}>
        <Text>{machineState.name}</Text>
      </View>
      <View style={styles.machineStateHours}>
        {hourItems}
      </View>
    </View>
  );
};





const data = {
  email: 'super_admin@siti.com',
  password: 'sititea1234'
};



    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const loginHandler = async () => {
    console.log('pressed');
    axios.post(`${baseUrl}/users/login`, data)
    .then(response => {
      console.log(response.data);
      navigation.navigate('MachineStats');
  })
  .catch(error => {
    console.error(error);
  });
}


    return(
      <ImageBackground 
      source={require('../assets/images/green_surface_reduced.jpg')} 
      blurRadius={10}
      style={{flex: 1}}>
        <TouchableWithoutFeedback  
        onPress={()=> {
            Keyboard.dismiss();
        }}>
        <View style={{
            marginTop: 40
            ,flex:1,
            
        }} >
            <View style={{
    alignItems: 'center',
    }}>
    
  <Image
  resizeMode='center'
    source={require('../assets/images/Logo-Siti-blanc.png')}
    style={{
        marginTop:'15%',
      width: width-5,
      height: height/4,
      top: '5%',
      
    }}
  />
    <Text style={{
        fontSize:50,
        fontWeight:'700',
        marginTop:'30%',
        color:'white',
        // marginBottom:'10%'
    }} >
        SITI
    </Text>

    <Text style={{
        fontSize:18,
        fontWeight:'600',
        marginBottom:'10%',
        color:'white'
    }} >
        Supervisory Control And Data Acquisition
    </Text>

  <View style={{
    marginTop:'10%'  }} >
  
  </View>
  <Input
  style={
    {padding:1,
    color: 'white'
    }
  }
    placeholderTextColor={'white'}
    placeholder='Email ID'
  onSubmitEditing={() => Keyboard.dismiss()}
  onChangeText={(e)=>setEmail(e)}
    leftIcon={
      <Icon
        name='home'
        size={25} 
        style={{
            margin:10
        }}
        color='white'
      />
    }
  />
  
  <Input
  style={{
    color: 'white'
  }}
    placeholder='Password'
    onChangeText={(pass)=>setPass(pass)}
    secureTextEntry={true}
    placeholderTextColor={'#F5FEFD'}
    
    leftIcon={
      <Icon
        name='lock'
        size={25} 
        style={{
            margin:10
        }}
        color='white'
       
      />
    }
  />


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
    onPress={ loginHandler}
    style={{
        marginTop:20,
        alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#598F7F',
    shadowColor: "#000",
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
        </TouchableWithoutFeedback>

        </ImageBackground> 
    );
  }



  export default NewLogin;
