import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button,
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
import Icon  from 'react-native-vector-icons/AntDesign'
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
import StoppagesModalContent from './stoppagesModalContent'
const baseUrl = 'http://gounane.ovh:8000/api/v1'

const FailureItem = ({ failure }) => {
  //    ************** states **************
  const [isModalVisible, setModalVisible] = useState(false)
  
  
  const { start_date, end_date } = failure

  // modal functions
  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  // period selection
  const handlePeriodSelection = (start, end) => {
    setSelectedStartDate(start)
    setSelectedEndDate(end)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'grey',
        marginVertical: 10,
        borderRadius: 15,
        marginHorizontal: 10,
        padding: 5,
      }}
    >
      <View
        style={{
          //center items
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: 'red',
        }}
      >
        {/* icon on the left */}
        <Icon style={{
          position: 'absolute',
          left: 10,
          top: 0,
          
        }} name='warning' size={30} color='red' />


        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            padding: 4,
          }}
        >
          Stoppage Detected
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            padding: 4,
          }}
        >
          Started At: [ {start_date && start_date.slice(11,16)} ]
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            padding: 4,
          }}
        >
          Ended At: [ {end_date && end_date.slice(11,16) } ]
        </Text>
        <View
          //button style
          style={{
            // borderRadius: 10,
            // justifyContent: 'center',
            // alignItems: 'center',
            margin: 10,
          }}
        > 


          
          <TouchableOpacity
            style={{
              backgroundColor: '#F6F6C9',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              width: 100,

            }}
            onPress={showModal}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'green',
                padding: 4,
              }}
            >
              Justify
            </Text>
          </TouchableOpacity>

        </View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={hideModal}
        >
           
            <View 
            style={
            styles.modalContainer
            }
            >

          <StoppagesModalContent

            failure={failure}
            toggleModal={toggleModal}
            onPeriodSelection={handlePeriodSelection}
            //  selectedStartDate={selectedStartDate}
            //  selectedEndDate={selectedEndDate}
          />
            </View>
        </Modal>
      </View>
    </View>
  )
}

export default FailureItem

const styles = StyleSheet.create({
    modalContainer: {
        height: '60%',
        marginTop: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 4,
        alignItems: 'center',
        // shadowColor: '#000',
    },


})
