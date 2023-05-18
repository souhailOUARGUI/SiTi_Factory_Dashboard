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
import FailureItem from './failureItem'

const baseUrl = 'http://gounane.ovh:8000/api/v1'

const StoppagesComponent = ({ mId,failures }) => {
  const machineId = '644735bcc10b778be78297a8'

  //     ************** states **************
//   const [failures, setFailures] = useState([])

//   useEffect(() => {
//     // get request to endpoint  {{URI}}/machine-failures?machine=644735bcc10b778be78297a8
//     console.log('fetching failures');
//     axios
//       .get(`${baseUrl}/machine-failures?machine=${machineId}`)
//       .then(response => {
//         console.log(response.data.data.machinefailures)
//         setFailures(response.data.data.machinefailures)
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }, [])

  return (
    <View
        style={{
          flex: 1,
            backgroundColor: '#F6F6C9',
            margin: 10,
            borderRadius: 15,
            padding: 10,
              width : width - 20,
            // height: height - 100,

            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
        }}

    >
    <ScrollView
              style={{  
                flex: 1,

              }}
              >
      <Text
        // centered title
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          color: '#000',
          marginBottom: 10,
        }}

      >Stoppages Component</Text>
      
      <View
        style={{  
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginBottom: 10,
          width: width - 35,
          //padding: 10,
          
        }}  
      />

      {failures && failures.map((failure) =>
         (
            // scrollView
              
            <FailureItem  failure={failure} key={failure._id} />

        )
        )
      }
              </ScrollView>
    </View>
  )
}

export default StoppagesComponent;
