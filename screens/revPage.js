import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableOpacity } from 'react-native';
import React from 'react';


const RevPage = ({navigation})=> {

    return(
        <View>
            <Text>{ navigation.getParam('name') }</Text>
            <Text> it is number {navigation.getParam('key')}</Text>
            <Text>{navigation.getParam('body')}</Text>
            
        </View>
    )

}






export default RevPage