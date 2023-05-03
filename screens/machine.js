

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
import { log, min } from 'react-native-reanimated';
import { Use } from 'react-native-svg';
import axios from 'axios';
import MachineTimetableRow from './machineRow';

const baseUrl = 'http://gounane.ovh:8000/api/v1';




export default function Machine({navigation}) {

    ///////////////////////////////////////////////////////////////

    const hours = [{id:1, timestamp: 0},
        {id:2, timestamp: 1},
        {id:3, timestamp: 2},
        {id:4, timestamp: 3},
        {id:5, timestamp: 4},
        {id:6, timestamp: 5},
        {id:7, timestamp: 6},
        {id:8, timestamp: 7},
        {id:9, timestamp: 8},
        {id:10, timestamp:9},
        {id:11, timestamp: 10},
        {id:12, timestamp: 11},
        {id:13, timestamp: 12},
        {id:14, timestamp: 13},
        {id:15, timestamp: 14},
        {id:16, timestamp: 15},
        {id:17, timestamp: 16},
        {id:18, timestamp: 17},
        {id:19, timestamp: 18},
        {id:20, timestamp: 19},
        {id:21, timestamp: 20},
        {id:22, timestamp: 21},
        {id:23, timestamp: 22},
     ]
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
        'working',
        'working',  
        'working',
        
         'working',
        'working',
        'working',
        'working',
        'working',
        'not working',
        'not working','not working',
        'not working',
        'not working','not working',  
        
        'not working','working',
        'working',
        'working',
        
        'working',
        'working',
        'working',
        'working',
        'not working','not working',
        'not working',  
        'working',
        'working',
        'not working',
        'not working',
        'not working',  
        'not working',
        'working',
        'working',
        'working',
        'working',
        'working',
        'working',
        'not working',
        'not working',
        'not working',  'not working',
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
    const [coups , setCoups] = useState([]);
    // const MachineId = null;
      const MachineId = navigation.getParam('id');
    useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MjY4Mzk1NiwiZXhwIjoxNjg1Mjc1OTU2fQ.Ym0TWyG9Ql_Tm5ceRVJXPl2Dm1C1Y1Tq1d9cFARUREk';




    //             get machine
    axios.get(`${baseUrl}/machines/${MachineId}`,
        //send jwt token in header
        { headers: { Authorization: `Bearer ${token}` } },
    ).then(response => {
        // console.log(JSON.stringify(response.data.data.machine));
        setMachine(response.data.data.machine);
        setZone(response.data.data.machine.zone);
        setDevice(response.data.data.machine.device);
        setTopics(response.data.data.machine.topics);
    });


    //              get coups 


    axios.get(`${baseUrl}/machines/${MachineId}/coups?sort=+createdAt&createdAt[gte]=2023-05-02&createdAt[lt]=2023-05-03`,
    //send jwt token in header
    { headers: { Authorization: `Bearer ${token}` } },
      ).then(response => {
        console.log("coups");
        // console.log( JSON.stringify(response.data.data.coups[0]));
        setCoups(response.data.data.coups);
        const date = new Date(response.data.data.coups[0].createdAt);
        // console.log(date.getUTCHours());
        const Hours = Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          minutes: Array.from({ length: 60 }, (_, j) => ({
            minute: j,
            coups: []
          }))
        }));

        
const HoursWithCoups = response.data.data.coups.reduce((acc, item) => {
  const date = new Date(item.createdAt);
  const hour = date.getUTCHours();
  const minute = date.getMinutes();
  console.log(hour);
  console.log(minute);
  console.log(item);
  
  acc[hour].minutes[minute].coups.push({min:minute, coups:item.coups_min});
  return acc;
}, Hours);
   console.log(HoursWithCoups[0].minutes[33]);

      // const hours = [];
      // const minutes = [];
      // response.data.data.coups.forEach(coup => {
      //   const date = new Date(coup.createdAt);
      //   // for (let index = 0; index < 60; index++) {
      //   //   if (date.getMinutes() == index) {
      //   //     minutes.push(date.getUTCMinutes());
      //   //   }else{
      //   //     //minutes.push(index);
      //   //   }
          
      //   // }
      //   minutes.push(date.getUTCMinutes());
      //   hours.push(minutes);
      

    }
    ).catch(error => {
        console.log(error);
    });

    }, [])


    return (
        <ScrollView 
        style ={styles.container}
        >



        <View >
            <Text
            style={styles.title}
            >{machine.name}</Text>
            <View style={styles.timeLine}  >
              <Text style={{
                textAlign: 'center',
                margin: 20,
                fontSize: 50,
                fontWeight: 'bold',
              }} >
                TimeLine Chart
              </Text>
            <MachineTimetableRow hours={hours} machineStates= {machineStates} 
              // style={styles.machineStateContainer}
              />

            </View>
            
            
        </View>
        </ScrollView>
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
    marginBottom: 40,
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
  timeLine: {
    flex: 1,
    marginTop: 20,

  },
});