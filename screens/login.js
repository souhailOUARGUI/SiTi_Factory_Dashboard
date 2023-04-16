import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableOpacity,FlatList } from 'react-native';
import React, { useState } from 'react';
import Spacing from '../constants/Spacing' 
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';


const LoginPage = ({navigation}) => {
    const [revs,setRevs] = useState([{name:'r1',key:'1',body:'body1 qkjfkksjqf eslfk'},
    {name:'r2',key:'2',body:'body1 qkjfkksjqf eslfk'},
    {name:'r3',key:'3',body:'body1 qkjfkksjqf eslfk'}
]);
    const pressHandler = () => {
        navigation.navigate('RevPage');
    }
    return (
    <View>
        <Text>
            Hii
        </Text>        
        <FlatList data={revs} 
        renderItem={({item}) => (
            <TouchableOpacity
            onPress={()=> navigation.navigate('RevPage',item)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )}
        >

        </FlatList> 
        
        
    </View>
)
}





export default LoginPage;
