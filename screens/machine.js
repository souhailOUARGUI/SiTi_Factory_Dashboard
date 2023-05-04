

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


    /////////////////////////////////////////////
    const [machine, setMachine] = useState({});
    const [zone , setZone] = useState({});
    const  [device , setDevice] = useState({});
    const [topics , setTopics] = useState({});
    const [coups , setCoups] = useState([]);
    const [TimeLineData , setTimeLineData] = useState([]);
    const [timeLineDateStart,setTimeLineDateStart] = useState('2023-05-03');
    const [timeLineDateEnd,setTimeLineDateEnd] = useState('2023-05-04');


    //      get current day  date :

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);
  const formattedNextDay = nextDay.toISOString().substr(0, 10);
  
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
    //              get coups of machine
    axios.get(`${baseUrl}/machines/${MachineId}/coups?sort=+createdAt&createdAt[gte]=${formattedDate}&createdAt[lt]=${formattedNextDay}`,
    //send jwt token in header
    { headers: { Authorization: `Bearer ${token}` } },
      ).then(response => {
        console.log("coups");
        // console.log( JSON.stringify(response.data.data.coups[0]));
        setCoups(response.data.data.coups);
        const date = new Date(response.data.data.coups[0].createdAt);
        
        // console.log(date.getUTCHours());


    // *********************   timeline data treatement *********************
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
  // console.log(hour);
  // console.log(minute);
  // console.log(item);

  acc[hour].minutes[minute].coups.push({col:item.coups_min==0?"red":item.coups_min<=30?'yellow':'green', coup:item.coups_min});
  return acc;
}, Hours);
    HoursWithCoups.forEach((hour) => {
      hour.minutes.forEach((minute) => {
        if (minute.coups.length === 0) {
          minute.coups.push({ min: "no data",col:"#D8D8D8" });
        }else{
           minute.coups = [minute.coups[0]];
          
        }
      });
    });
  console.log(HoursWithCoups[7].minutes[1]);
  setTimeLineData(HoursWithCoups);
  console.log(formattedDate);
  console.log(formattedNextDay);

  // console.log(timeLineDateStart);


  ////////////////////////////////////
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
            <MachineTimetableRow 
            // hours={hours} machineStates= {machineStates} 
            TimeLineData={TimeLineData}
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