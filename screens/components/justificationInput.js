import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    Dimensions,
    Image,
    RadioButton,
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

  
  const baseUrl = 'http://gounane.ovh:8000/api/v1'
  

  const JustificationInput = ({ category, onPeriodSelection }) => {
    const [selectedCause, setSelectedCause] = useState('');
  
    const handleCauseSelection = (causeId) => {
      setSelectedCause(causeId);
    };
  
    return (
      <View>
        <Text>{category.name}</Text>
        <View>
          {category.causes.map((cause) => (
            <RadioButton
              key={cause._id}
              // label={cause.label}
              //  value={cause._id}
              // onSelect={  () => {
                // handleCauseSelection(cause._id);
                // onPeriodSelection(cause._id);
              // }}
            />
          ))}
        </View>
      </View>
    );
  };

    export default JustificationInput;