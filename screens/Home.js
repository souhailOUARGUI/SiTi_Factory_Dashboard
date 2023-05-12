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
import Icon from 'react-native-vector-icons/AntDesign'

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
import { NavigationContainer } from '@react-navigation/native'
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
import { log } from 'react-native-reanimated'
import { Use } from 'react-native-svg'
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MachineStats from './machineStats'
import NavTest from './navTest'
const Tab = createBottomTabNavigator()
const HomeComp = ({ navigation }) => {
  return (
    //NavigationConatainer
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            marginVertical: 10,
            height: 60,
            borderRadius: 15,
            marginHorizontal: 10,
            backgroundColor: '#F6F6C9',
            // shadowColor: "#000",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name='home'
                  size={30}
                  color={focused ? '#755851' : '#C5D8A4'}
                />
              </View>
            ),
          }}
          name='MachineStats'
          component={MachineStats}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name='solution1'
                  size={30}
                  color={focused ? '#755851' : '#C5D8A4'}
                />
              </View>
            ),
          }}
          name='NavTest'
          component={NavTest}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default HomeComp
