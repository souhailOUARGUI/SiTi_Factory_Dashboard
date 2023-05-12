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
  Pressable,
  ActivityIndicator,
  TextInput,
  Button,
  Animated,
} from 'react-native'

import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
const { height, width } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/AntDesign';


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
import MachineTimetableRow from './machineRow'
import StoppageComp from './stoppages/stoppageComp'
import io from 'socket.io-client'
import ShiftsComp from './shiftsComp'

const baseUrl = 'http://gounane.ovh:8000/api/v1'

export default function Machine({ navigation }) {
  ///////////////////////////////////////////////////////////////
  const stoppagePeriods = []

  /////////////////////////////////////////////
  const [machine, setMachine] = useState({})
  const [shifts, setShifts] = useState([])
  const [product, setProduct] = useState({})
  const [stoppages, setStoppages] = useState([])
  const [zone, setZone] = useState({})
  const [device, setDevice] = useState({})
  const [topics, setTopics] = useState({})
  const [coups, setCoups] = useState([])
  const [TimeLineData, setTimeLineData] = useState([])
  const [timeLineDateStart, setTimeLineDateStart] = useState('2023-05-03')
  const [timeLineDateEnd, setTimeLineDateEnd] = useState('2023-05-04')
  const [socketData, setSocketData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  //      get current day  date :

  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  const nextDay = new Date()
  nextDay.setDate(today.getDate() + 1)
  const formattedNextDay = nextDay.toISOString().substr(0, 10)

  // const MachineId = null;
  const MachineId = navigation.getParam('id')
  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MjY4Mzk1NiwiZXhwIjoxNjg1Mjc1OTU2fQ.Ym0TWyG9Ql_Tm5ceRVJXPl2Dm1C1Y1Tq1d9cFARUREk'

    //             get machine
    axios
      .get(
        `${baseUrl}/machines/${MachineId}`,
        //send jwt token in header
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(response => {
        // console.log(JSON.stringify(response.data.data.machine));
        setMachine(response.data.data.machine)
        setZone(response.data.data.machine.zone)
        setDevice(response.data.data.machine.device)
        setProduct(response.data.data.machine.current_product)

        setTopics(response.data.data.machine.topics)
      })
    //              get coups of machine
    axios
      .get(
        `${baseUrl}/machines/${MachineId}/coups?sort=+createdAt&createdAt[gte]=${formattedDate}&createdAt[lt]=${formattedNextDay}`,
        //send jwt token in header
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(response => {
        console.log('coups')
        setCoups(response.data.data.coups)
        const date = new Date(response.data.data.coups[0].createdAt)

        // *********************   timeline data treatement *********************
        const Hours = Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          minutes: Array.from({ length: 60 }, (_, j) => ({
            minute: j,
            coups: [],
          })),
        }))

        //     current time
        const now = new Date()
        const currentHour = now.getUTCHours()
        const currentMinute = now.getUTCMinutes()
        //       hours with coups
        const HoursWithCoups = response.data.data.coups.reduce((acc, item) => {
          const date = new Date(item.createdAt)
          const hour = date.getUTCHours()
          const minute = date.getMinutes()
          // console.log(hour);
          // console.log(minute);
          // console.log(item);

          acc[hour].minutes[minute].coups.push({
            col:
              item.coups_min == 0
                ? 'red'
                : item.coups_min <= 30
                ? 'yellow'
                : 'green',
            coup: item.coups_min,
          })
          return acc
        }, Hours)
        //           coloring minutes with no data
        HoursWithCoups.forEach(hour => {
          hour.minutes.forEach(minute => {
            if (minute.coups.length === 0) {
              minute.coups.push({ min: 'no data', col: '#B9B9B7' })
            } else {
              minute.coups = [minute.coups[0]]
            }
          })
        })

        // set colors for future time

        for (let h = 0; h < HoursWithCoups.length; h++) {
          for (let m = 0; m < HoursWithCoups[h].minutes.length; m++) {
            if (h > currentHour || (h == currentHour && m > currentMinute)) {
              HoursWithCoups[h].minutes[m].coups.forEach(coup => {
                coup.col = 'white'
              })
            }
          }
        }

        //////////detect stoppages//////
        // initialize an array to store stoppage periods
        // const stoppagePeriods = [];

        // // loop through the HoursWithCoups array
        // for (let h = 0; h < HoursWithCoups.length; h++) {
        //   for (let m = 0; m < HoursWithCoups[h].minutes.length; m++) {
        //     // check if the minute has a red color
        //     if (HoursWithCoups[h].minutes[m].coups[0].col === 'red') {
        //       // if it does, initialize a new stoppage period object
        //       const newPeriod = {
        //         start: { hour: h, minute: m },
        //         end: { hour: h, minute: m }
        //       };
        //       // loop through the remaining minutes and group consecutive stoppages together
        //       for (let m2 = m + 1; m2 < HoursWithCoups[h].minutes.length; m2++) {
        //         if (HoursWithCoups[h].minutes[m2].coups[0].col === 'red') {
        //           newPeriod.end = { hour: h, minute: m2 };
        //           m = m2; // skip the remaining minutes in this stoppage period
        //         } else {
        //           break; // stop grouping consecutive stoppages together
        //         }
        //       }
        //       // add the stoppage period object to the array
        //       stoppagePeriods.push(newPeriod);
        //     }
        //   }
        // }
        setTimeLineData(HoursWithCoups)
        // setStoppages(stoppagePeriods);

        // implementing socket data method
        const socket = io('http://gounane.ovh:8000', {
          transports: ['websocket'],
          query: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MzMyMDA1MSwiZXhwIjoxNjg1OTEyMDUxfQ.cQB3zYsmRUxm4ESGABBEB9j3kNokl7zPIQKOejN5Yxc', // Replace with your access token
          },
          auth: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4MzMyMDA1MSwiZXhwIjoxNjg1OTEyMDUxfQ.cQB3zYsmRUxm4ESGABBEB9j3kNokl7zPIQKOejN5Yxc', // Replace with your access token
          },
        })
        socket.on('connect', () => {
          console.log('connected to socket')
        })

        socket.on('mqtt-NASA25', data => {
          const date = new Date(data.createdAt)
          const hour = date.getUTCHours()
          const minute = date.getUTCMinutes()
          const coups = {
            col:
              data.coups_min === 0
                ? 'red'
                : data.coups_min <= 30
                ? 'yellow'
                : 'green',
            coup: data.coups_min,
          }
          //console.log(data);
          HoursWithCoups[hour].minutes[minute].coups = [coups]

          // Update the component state to trigger re-rendering
          setTimeLineData([...HoursWithCoups])
        })

        return () => {
          socket.disconnect()
        }
        ////////////////////////////////////
      })
      .catch(error => {
        console.log(error)
      })

    //    ************get shift of machine with {{URI}}/shifts?machines=644735bcc10b778be78297a1&days=Mo ******************
    // get current day Mo format
    const today = new Date()
    const shiftDay = today
      .toLocaleString('en-us', { weekday: 'long' })
      .substr(0, 2)
    // axios api  call for shifts
    axios
      .get(
        `${baseUrl}/shifts?machines=${MachineId}&days=${shiftDay}`,
        //send jwt token in header
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(response => {
        // console.log("shifts");
        // setShifts(response.data.data.shifts);
        // console.log(shifts[1]);
        // console.log(shifts[1].start_hour);
        // console.log(shifts[1].end_hour);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  //       product changing handler for modal
  const handleModalPress = () => {
    setModalVisible(true)
  }
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/josh-calabrese-XXpbdU_31Sg-unsplash.jpg')}
        blurRadius={0}
        borderRadius={30}
        style={{
          flex: 1,
          marginTop: 25,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}
        resizeMode='cover'
        imageStyle={{ borderRadius: 30, marginTop: -150 }}
      >
        {/* go back button */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 10,
            backgroundColor: '#F6F6C9',
            borderRadius: 50,
            padding: 10,
          }}
        >
          <Icon name='arrowleft' size={30} color={'#755851'} />
        </Pressable>
        

        <Text style={styles.title}>{machine.name}</Text>
        <Pressable onPress={handleModalPress}>
          <Text style={styles.prodName}>{product?.name}</Text>
        </Pressable>
      </ImageBackground>
      {/* MOdal Part */}
      <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Product Name</Text>
          <TextInput
            style={styles.input}
            value={product?.name}
            onChangeText={text => {
              // Handle input changes here
            }}
          />

          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <View style={{ width: '30%' }}>
              <Button
                title='Save'
                onPress={() => {
                  // Handle save button press here
                  setModalVisible(false)
                }}
                color={'green'}
              />
            </View>
            <View style={{ width: '30%' }}>
              <Button
                title='Cancel'
                onPress={() => setModalVisible(false)}
                color='gray'
                style={{ width: '50%' }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <View style={styles.timeLine}>
          {/* <StoppageComp stoppagePeriods={stoppages}  /> */}
          <View style={styles.timeLineContainer}>
            <Text
              style={{
                textAlign: 'center',
                margin: 2,
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              TimeLine Chart
            </Text>

            <ShiftsComp />

            <MachineTimetableRow TimeLineData={TimeLineData} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    margin: 50,
    fontWeight: 'bold',
    fontSize: 40,
    //green text shadow style
    textShadowColor: 'gray',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  machineStateContainer: {
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
  timeLineContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 50,
    borderRadius: 30,
    padding: 2,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  machineheaderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
    backgroundColor: '#F6F6C9',
  },
  prodName: {
    //position in the buttom on the left of the parent component
    position: 'absolute',
    bottom: 0,
    left: width / 30,
    fontSize: 20,
    fontWeight: '600',
    color: '#755851',
    margin: 10,
    
    // textShadowColor: 'gray',
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: '40%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 40,
    //shadow radius
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
})
