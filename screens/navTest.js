import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native'

import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
const { height, width } = Dimensions.get('window')

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'

import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  Divider,
  Drawer,
  DrawerItem,
  IndexPath,
  ViewPager,
  Layout,
} from '@ui-kitten/components'
import { log, min } from 'react-native-reanimated'
import { Use } from 'react-native-svg'
import axios from 'axios'
import { io } from 'socket.io-client'

const NavTest = ({ navigation }) => {
  const [socketData, setSocketData] = useState([])

  // useEffect(() => {
  //      const socket = io('http://gounane.ovh:8000',
  //      {
  //         transports: ['websocket'],
  //         query: {
  //           access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MzMyMDA1MSwiZXhwIjoxNjg1OTEyMDUxfQ.cQB3zYsmRUxm4ESGABBEB9j3kNokl7zPIQKOejN5Yxc' // Replace with your access token
  //         },
  //         auth: {
  //           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MzMyMDA1MSwiZXhwIjoxNjg1OTEyMDUxfQ.cQB3zYsmRUxm4ESGABBEB9j3kNokl7zPIQKOejN5Yxc' // Replace with your access token
  //         }
  //       }
  //      );
  //     socket.on('connect', () => {
  //         console.log('connected');
  //     });
  //     // socket.on('connection', (data) => {
  //     //     // setSocketData(data);
  //     //     // console.log(data);
  //     // });
  //     socket.on('mqtt-NASA25', (data) => {
  //         setSocketData(data);
  //         console.log(data);
  //     });

  //     return () => {
  //         socket.disconnect();
  //         //remove listener for 'mqtt-NASA28'
  //         // socket.off('mqtt-NASA28');
  //       };
  //     // });
  // }, []);




  
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          margin: 40,
          fontSize: 50,
          textAlign: 'center',
        }}
      >
        Operators
      </Text>
      {/* <View 
            style={{
              shadowOffset: {width: 10, height: 10},
    shadowOpacity: 5,
    shadowColor: "grey",
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: 'green',
    width: 100,
    height: 100,
            }}
            
            >


            </View> */}
    </View>
  )
}

export default NavTest
