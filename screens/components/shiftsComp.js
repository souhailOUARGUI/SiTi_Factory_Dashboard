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

const ShiftsComp = ({ navigation, shifts }) => {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 30 }}>shiftsComp</Text>
    </View>
  )
}

export default ShiftsComp
