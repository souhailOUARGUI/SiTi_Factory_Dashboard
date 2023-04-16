import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Spacing from '../constants/Spacing' 
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
const {height,width} = Dimensions.get("window");


const WelcomePage = ({navigation}) => {

const loginPressHandler = () => {
    navigation.navigate('LoginPage');
}


    return (
        <SafeAreaView>
            <View>
            <ImageBackground
            style={styles.bImage}
            resizeMode='contain'
            source={require("../assets/welcomee.png") }
            />
            <View style={
                styles.wTitle
            } >
                {/* <Image 
                source={require('../assets/logo-header.png')}
                >

                </Image>
                 */}
                 <Text style={{textAlign: 'center',
                fontSize: 50,
                color: Colors.primary,
                fontWeight: '900'
                ,marginBottom:20,
                textShadowColor: 'rgba(0, 0, 0, 0.60)',textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10
                }} >
                    SITI TEA
                 </Text>
                <Text style= {{textAlign: 'center',
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                //fontFamily: Font["poppins-bold"]
                }}>
                PROVIDING INFINITE POSSIBILITIES TO MAKE YOUR PREMIUM <Text style= {{textAlign: 'center',
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontWeight: 'bold'
                //fontFamily: Font["poppins-bold"]
                }} >TEA PACKING </Text> SEAMLESS
                </Text>
                
                
            </View>
            <View 
            style={
                {paddingHorizontal: Spacing*2
                , paddingVertical: Spacing*2,
                alignItems: 'center'}
            }
            >
                <TouchableOpacity style={{
                    backgroundColor:Colors.primary,
                    paddingHorizontal: Spacing*2
                    ,paddingVertical: Spacing*1.5,
                    width:"48%",
                    borderRadius: Spacing,
                    shadowColor: "#000",
                    shadowOffset: {
                	width: 0,
    	            height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,
                        elevation: 17,


                }} 
                onPress={loginPressHandler}>
                    <Text 
                    style={{color: Colors.onPrimary,
                    fontSize: FontSize.large,
                    textAlign: 'center',
                    fontWeight: '600'
                    }} >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            </View>

            
        </SafeAreaView>
    )
}

export default WelcomePage;

const styles = StyleSheet.create({
    bImage:{
        height: height / 2,width:width
    },
    wTitle: {
        paddingHorizontal: 20,
        paddingTop:10,
        justifyContent: 'center',
        alignItems: 'center'

    }
})