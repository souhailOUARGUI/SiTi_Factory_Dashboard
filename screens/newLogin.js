import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableWithoutFeedback,
    TextInput,
    Pressable,Keyboard } from 'react-native';
import React, { useState } from 'react';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';


const { height, width } = Dimensions.get("window");



const NewLogin = ({navigation}) =>{
   
    const [checked, setChecked] = useState(false);

    const loginHandler = () => {
    navigation.navigate('MachineStats');
}


    return(
      <ImageBackground 
      source={require('../assets/images/green_surface.jpg')} 
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
        marginTop:'40%',
        color:'white'
    }} >
        SITI-SCADA
    </Text>
    <Text style={{
        fontSize:20,
        fontWeight:'700',
        // marginTop:'45%',
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
    onChangeText={(txt)=>console.log(txt)}
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