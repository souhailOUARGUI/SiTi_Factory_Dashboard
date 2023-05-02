
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

const baseUrl = 'http://gounane.ovh:8000/api/v1';

const chartConfig = {
  backgroundGradientFrom: "#C5D8A4",
  backgroundGradientFromOpacity: 2,
  backgroundGradientTo: "#598F7F",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(254,255,184, ${opacity})`,
  //rgba(254,255,184,1)
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};


const MachineStats = ({ navigation }) => {
  const [machines, setMachines] = useState([]);

  const data = {
    labels: ["dispo", "Perfo", "qualité"], // optional
    data: [0.4, 0.6, 0.8],
    colors: ["cyan", "orange", "yellow"]
  };

  const toOneMachine = (id) => {
    navigation.navigate('Machine', { id: id });
  }
  useEffect(() => {
    console.log('useEffect');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MjY4Mzk1NiwiZXhwIjoxNjg1Mjc1OTU2fQ.Ym0TWyG9Ql_Tm5ceRVJXPl2Dm1C1Y1Tq1d9cFARUREk';
    axios.get(`${baseUrl}/machines`,
      //send jwt token in header
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        console.log(JSON.stringify(response.data.data.machines));
        setMachines(response.data.data.machines);

      })
      .catch(error => {
        console.error(error);
      });
  }, [])



  return (

    // <ImageBackground
    //   //  source={require('../assets/images/tea_backgr.jpg')}
    //   resizeMode='cover'
    //   blurRadius={0}
    //   style={{
    //     flex: 1,

    //   }}
    // >

      <View
        style={styles.container}
      >
        <Text style={{
          margin: 20,
          fontSize: 40,
          textAlign: 'center',
          
          marginBottom: 30,
          
        }} >
          Machines
        </Text>
        <ScrollView
          style={{
            // flex:1
            
          }}

        >
          <View
          style={{
            justifyContent:'center',
            alignItems:'center',
          }}
           >


          {machines &&
            machines.map((machine) => (
              
              <Pressable
                key={machine._id}
                onPress={() => toOneMachine(machine._id)}
                style={{
                  marginBottom: 5,
                  margin: 15,
                  padding: 5,
                  borderRadius: 15,
                  borderColor: 'white',
                  borderWidth: 1,
                  shadowColor: "#000",
                  backgroundColor: 'white',
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 0,

                }}
              >
                <View>
                  <View style={{
                    flexDirection: 'column',
                    // justifyContent: 'space-between',
                    margin: 2,
                    // alignItems: 'flex-start',

                  }} >
                  <Text style={{
                      padding: 10,
                      fontSize: 18,
                      textAlign: 'center',


                    }} >
                      <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                      }} >{machine.name}</Text>
                    </Text>
                    
                    
                    <Text
                    style = {{
                      fontSize: 18,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    >
                    General statistics :
                    </Text>
                  </View>

                  <ProgressChart
                    withCustomBarColorFromData={true}
                    data={data}
                    width={width - 20}
                    style={{
                      // padding: 10,
                      marginBottom: 10,
                      borderRadius: 20,

                    }}
                    height={200}
                    strokeWidth={10}
                    radius={30}

                    chartConfig={chartConfig}
                    hideLegend={false}
                  />
                  <View
                  style={{
                  
                  }}
                  >
                    
                    <Text style={{
                     
                      fontSize: 18,
                      textAlign: 'left',

                    }} >
                      Brand : <Text style={{
                        fontSize: 18,
                        fontWeight: '400',
                      }} >{machine.brand}</Text>
                    </Text>
                    <Text style={{
                     
                      fontSize: 18,
                      textAlign: 'left',

                    }} >
                      Model : <Text style={{
                        fontSize: 18,
                        fontWeight: '400',
                      }} >{machine.model}</Text>
                    </Text>
                    <Text style={{
                       paddingBottom: 10,
                      fontSize: 18,
                      textAlign: 'left',

                    }} >
                      device ID : <Text style={{
                        fontSize: 18,
                        fontWeight: '400',
                      }} >{machine.device}</Text>
                    </Text>
                  </View>

                </View>
              </Pressable>

            ))}
          </View>



        </ScrollView>

      </View>
    // </ImageBackground>


  )

}



export default MachineStats;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tab: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
