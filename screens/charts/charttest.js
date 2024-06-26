
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableOpacity } from 'react-native';

import React, { useState } from 'react';
import Timeline from 'react-native-timeline-flatlist';
const {height,width} = Dimensions.get("window");

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  import * as eva from '@eva-design/eva';
import { ApplicationProvider,Divider,Drawer, DrawerItem, IndexPath ,ViewPager,Layout,  } from '@ui-kitten/components';




const ChartTest = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
return(
    

  <View>
    <Text style={{
      margin: 40,
      fontSize: 50,  
      textAlign: 'center',
    }} >
       Machines
    </Text>

    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Layout
        style={styles.tab}
        level='2'
      >
        {/* <Text category='h5'>
USERS
        </Text> */}
        <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      margin: 15
    }}
  />
      </Layout>
      <Layout
        style={styles.tab}
        level='2'
      >
        <Text category='h5'>
ORDERS
        </Text>
      </Layout>
      <Layout
        style={styles.tab}
        level='2'
      >
        <Text category='h5'>
TRANSACTIONS
        </Text>
      </Layout>
    </ViewPager>
    
    
  </View>
   
  
)

}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <ChartTest/>
    
    

    <Divider style={{
      margin:20,
    }}   >
    </Divider>

    
  </ApplicationProvider>
);


const styles = StyleSheet.create({
  tab: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
