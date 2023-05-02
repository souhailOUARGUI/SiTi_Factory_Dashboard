

import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import React, { useState, useEffect } from 'react';
import Timeline from 'react-native-timeline-flatlist';
const { height, width } = Dimensions.get("window");

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Divider, Drawer, DrawerItem, IndexPath, ViewPager, Layout, } from '@ui-kitten/components';
import { log } from 'react-native-reanimated';
import { Use } from 'react-native-svg';
import axios from 'axios';
import MachineTimetableRow from './machineRow';
const baseUrl = 'http://gounane.ovh:8000/api/v1';




export default function Machine({navigation}) {

    ///////////////////////////////////////////////////////////////

    const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16]
    const machineStates = [
      
        'working',
        'working',
        'working',
         
        'working',
        'working',
        'working',
        'working',
        'working',
        'working',
         
        'working',
        'working',
        'working',
        'working',
        'working',
        'working',
          
        'working',
        
        'not working',
        'not working', 'working',
        'working',
        'not working','working',
        'working',
        'working',
        'not working',
        'not working',
        'not working',  
        'working',
        'working',
        'working',
        'not working','working',
        'working',
        'working',
        'not working',
        'not working',
        'not working',  
        'working',
        'working',
        'working',
        'not working','working',
        'working',
        'working',
        'not working',
        'not working',
        'not working',  
        'working',
        'working',
        'working',
        'not working','working',
        'working',
        'working',
        'not working',
        'not working',
        'not working',  
        'working',
        'working',
        'working',
        'not working',
      ];

    /////////////////////////////////////////////
    const [machine, setMachine] = useState({});
    const [zone , setZone] = useState({});
    const  [device , setDevice] = useState({});
    const [topics , setTopics] = useState({});
    const MachineId = navigation.getParam('id');
    useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MjY4Mzk1NiwiZXhwIjoxNjg1Mjc1OTU2fQ.Ym0TWyG9Ql_Tm5ceRVJXPl2Dm1C1Y1Tq1d9cFARUREk';
    axios.get(`${baseUrl}/machines/${MachineId}`,
        //send jwt token in header
        { headers: { Authorization: `Bearer ${token}` } },
    ).then(response => {
        console.log(JSON.stringify(response.data.data.machine));
        setMachine(response.data.data.machine);
        setZone(response.data.data.machine.zone);
        setDevice(response.data.data.machine.device);
        setTopics(response.data.data.machine.topics);

    })
    }, [])


    return (
        <View style ={styles.container}>
            <Text
            style={styles.title}
            >{machine.name} <Text>
                
            </Text></Text>

            
            <MachineTimetableRow hours={hours} machineStates= {machineStates} ></MachineTimetableRow>
        </View>
    )   
}


const styles = StyleSheet.create({          
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title:{
        fontSize: 18,
        textAlign: 'center',
        margin: 50,
        fontWeight: 'bold',
        fontSize: 30,

    }
  ,machineStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  machineStateName: {
    width: '25%',
  },
  machineStateHours: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hourItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 2,
  },
});