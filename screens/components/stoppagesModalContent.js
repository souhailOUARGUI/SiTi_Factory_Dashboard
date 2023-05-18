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
  TextInput,
  Pressable,
  Alert,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
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
import Icon from 'react-native-vector-icons/AntDesign'
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
import { log, min, set } from 'react-native-reanimated'
import { Use } from 'react-native-svg'
import axios from 'axios'
import { io } from 'socket.io-client'
import JustificationInput from './justificationInput'
import DateTimePicker from '@react-native-community/datetimepicker'
const baseUrl = 'http://gounane.ovh:8000/api/v1'

const StoppagesModalContent = ({
  failure,
  toggleModal,
  onPeriodSelection,
  // selectedStartDate,
  // selectedEndDate,
}) => {
  //    ************** states **************
  const [causeCategories, setCauseCategories] = useState([])
  const [selectedCause, setSelectedCause] = useState('')
  const [selectedCauseId, setSelectedCauseId] = useState('')
  const [SelectedCategory, setSelectedCategory] = useState('')
  const [categoriesData, setCategoriesData] = useState([])

  const [endShowDatePicker, setEndShowDatePicker] = useState(false)
  const [startShowDatePicker, setStartShowDatePicker] = useState(false)
  const [causes, setCauses] = useState([])
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(failure.start_date))
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(failure.end_date))
  const [justifications, setJustifications] = useState([])
  const [justifValidator, setJustifValidator] = useState(false)

  useEffect(() => {
    // get request to endpoint  {{URI}}/cause-categories

    fetchCauseCategories()
  }, [])

  const fetchCauseCategories = () => {
    // token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDczNWI5YzEwYjc3OGJlNzgyOTc4MSIsImlhdCI6MTY4NDMyNzMxNywiZXhwIjoxNjg2OTE5MzE3fQ.dn9roQGTef2W5JaGQmgh_xSEi6NpCgF8A1vo86iicKk'
    axios
      .get(
        `${baseUrl}/cause-categories`,
        // send jwt token in the header of the request
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(response => {
        setCauseCategories(response.data.data.causecategories)

        // push categories names into array of strings
        let categoriesData = []
        response.data.data.causecategories.map(category => {
          categoriesData.push(category.name)
        })
        setCategoriesData(categoriesData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleCauseSelection = causeId => {
    setSelectedCauseId(causeId)
    console.log('selectedCauseId')
    console.log(selectedCauseId)
  }

  const getCategoryCauses = async categoryName => {
    //push causes array from causeCategories into causes array
    causeCategories.map(category => {
      if (category.name === categoryName) {
        setCauses(category.causes)
      }
    })
  }

  
  const validateJustifications = (justifications, failure) => {
    const numJustifications = justifications.length;
    
    for (let i = 0; i < numJustifications; i++) {
      const justification = justifications[i];
      const previousJustification = justifications[i - 1];
      
      if (i === 0) {
        // For the first object, start_date should be equal to the failure's start_date
        //compare with getHours() and getMinutes()
        if (
          new Date(justification.start_date).getHours() !== 
          new Date(failure.start_date).getHours() || 
          new Date(justification.start_date).getMinutes() !==
          new Date(failure.start_date).getMinutes()
         )  {
            console.log(
              "Start date for the first justification must be equal to the failure's start date."
          );
          return false;
        }
      } else {
        console.log(i - 1);
        // For intermediate objects, start_date should be equal to the previous object's end_date
        console.log(
          new Date(justification.start_date),
          new Date(previousJustification.end_date)
          );
          if (
            new Date(justification.start_date).getHours() !==
            new Date(previousJustification.end_date).getHours() ||
            new Date(justification.start_date).getMinutes() !==
            new Date(previousJustification.end_date).getMinutes()
            ) {
              console.log(
                `Start date for the justification at index ${i} must be equal to the end date of the previous justification.`
                );
                return false;
              }
            }
            if (i === numJustifications - 1) {
              // For the last object, end_date should be equal to the failure's end_date
              console.log(new Date(justification.end_date).getTime(), new Date(failure.end_date).getTime());
        if (
          new Date(justification.end_date).getTime() !==
          new Date(failure.end_date).getTime()
          ) {
            console.log(
              "End date for the last justification must be equal to the failure's end date."
              );
              return false;
            }
          }
        }
        
        return true;
      };
      const justifValidatorHandler = (justifications,failure) => {
        if (validateJustifications(justifications,failure)) {
          console.log("Justifications are valid.");
          setJustifValidator(true)
          //alert with centered title and message

          Alert.alert(
            "Justifications are valid.",

            "Thanks for justifying.",
            [
              {
                text: "OK",
                onPress: () => {console.log("OK Pressed")
                toggleModal();
              },
                style: "cancel"

              }
            ],
            { cancelable: false,userInterfaceStyle:'dark', }
          );


          

          //send justifications with axios to endpoint {{URI}}/machine-failures/645e73fe371b2c08ab0b1ae3 with patch
          // axios
          //   .patch(
          //     `${baseUrl}/machine-failures/${failure._id}`,
          //     { justifications: justifications },
          //     // send jwt token in the header of the request
          //     { headers: { Authorization: `Bearer ${token}` } },
          //   )
          //   .then(response => {
          //     console.log("JUSTIF RESPONSE DATA");
          //     console.log(response.data);
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
          // // empty justifications array
          // setJustifications([])

          

          // onPeriodSelection(justifications);
          // toggleModal();
        } else {
          console.log("Justifications are not valid.");
          Alert.alert(
            "Justifications are not valid.",
            "Please check your justifications.",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
                style: "cancel"

              } 
            ],
            { cancelable: false }
          );
          setJustifValidator(false)
        }
    
      }
      
      return (
        <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {/* Close Modal Button  */}
        <TouchableOpacity
          style={{
            //yellow color
            backgroundColor: '#F6F6C9',
            borderRadius: 30,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
          onPress={toggleModal}
        >
          <Icon name='close' size={30} color='#598F7F' />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 10,
            color: '#755851',
          }}
        >
          Stoppage
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              margin: 0,
              //green color used
              color: '#598F7F',
            }}
          >
            {failure.start_date && failure.start_date.slice(11, 16)}
          </Text>{' '}
          -{' '}
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              margin: 0,
              //green color used
              color: '#598F7F',
            }}
          >
            {failure.end_date && failure.end_date.slice(11, 16)}
          </Text>
        </Text>

        {/* Selected start and end dates */}
        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <TextInput
            style={{
              height: 40,
              // width: 150,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 10,
              padding: 0,
              margin: 4,
              fontSize: 20,
              textAlign: 'center',
            }}
            placeholder='Start Date'
            value={
              //change this format from 2023-05-13T07:07:06.777Z to 06:00
              failure.start_date && failure.start_date.slice(11, 16)
            }
          /> */}
          {startShowDatePicker && (
            <DateTimePicker
              mode='time'
              value={selectedStartDate}
              onChange={(event, selectedDate) => {
                // console.log('selectedDate')
                // console.log(selectedDate)
                setSelectedStartDate(selectedDate)
                console.log('selectedStartDate')
                console.log(selectedStartDate)
                setStartShowDatePicker(false)
              }}
            ></DateTimePicker>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: '#F6F6C9',
              borderRadius: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            onPress={() => {
              setStartShowDatePicker(true)
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 0,
                color: '#598F7F',
              }}
            >
              Pick Start Time
            </Text>
          </TouchableOpacity>

          {endShowDatePicker && (
            <DateTimePicker
              mode='time'
              value={selectedEndDate}
              onChange={(event, selectedDate) => {
                // console.log('selectedDate')
                // console.log(selectedDate)
                setSelectedEndDate(selectedDate)
                console.log('selectedEndDate')
                console.log(selectedEndDate)
                setEndShowDatePicker(false)
              }}
            ></DateTimePicker>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: '#F6F6C9',
              borderRadius: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            onPress={() => {
              setEndShowDatePicker(true)
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 0,
                color: '#598F7F',
              }}
            >
              Pick End Time
            </Text>
          </TouchableOpacity>
        </View>
        {/* row flex View */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              // margin: 10,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* <Text>Select Category</Text> */}
            <SelectDropdown
              // change select an option text
              defaultButtonText='Select Category'
              // selectedRowStyle={{ backgroundColor: '#F6F6C9' }}
              buttonStyle={{
                // backgroundColor: '#F6F6C9'
                width: 160,
                borderRadius: 20,
              }}
              data={categoriesData}
              onSelect={(selectedItem, index) => {
                setSelectedCategory(selectedItem)
                getCategoryCauses(selectedItem)
                console.log('selectedCategory')
                console.log(SelectedCategory)
              }}
            />
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              borderRadius: 20,
            }}
          >
            {/* Select Cause */}
            <SelectDropdown
              defaultButtonText='select cause'
              // selectedRowStyle={{ backgroundColor: '#F6F6C9' }}
              buttonStyle={{
                // backgroundColor: '#F6F6C9'
                width: 150,
                borderRadius: 20,
              }}
              rowStyle={{
                width: 200,
              }}
              //dropdown right margin

              dropdownStyle={{
                width: 200,
              }}
              data={causes.map(cause => cause.label)}
              onSelect={(selectedItem, index) => {
                setSelectedCause(selectedItem)
                // console.log('selectedCause')
                // console.log(selectedCause)
                // console.log(causes[index]._id)
                handleCauseSelection(causes[index]._id)
              }}
            />
          </View>
        </View>

        {/* display justifications objects   */}
        {justifications &&
          justifications.map(justification => (
            <View
              key={justification.cause}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F6F6C9',
                borderRadius: 20,
                padding: 10,
                width: 180,
                margin: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
              >
                {justification.start_date?.slice(11, 16)} -----{'>'}{' '}
                {justification.end_date?.slice(11, 16)}{' '}
              </Text>
              {/* delete Item from array Icon */}
              <TouchableOpacity
                onPress={() => {
                  // delete justification from justifications array
                  const newJustifications = justifications.filter(
                    justif =>
                      justif.cause !== justification.cause &&
                      justif.start_date !== justification.start_date &&
                      justif.end_date !== justification.end_date,
                  )
                  setJustifications(newJustifications)
                }}
              >
                <Icon name='delete' size={20} color='#755851' />
              </TouchableOpacity>
              
            </View>
          ))}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Add Button to add another justification to justifications array */}

          <TouchableOpacity
            style={{
              backgroundColor: '#F6F6C9',
              borderRadius: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              width: 50,
            }}
            onPress={() => {
              // add new justification to justifications array
              console.log('before justifications')
              console.log('selectedCauseId')
              console.log(selectedCauseId)
              console.log('selectedStartDate')
              console.log(selectedStartDate)
              console.log('selectedEndDate')
              console.log(selectedEndDate)
              console.log('justifications on ')
              setJustifications([
                ...justifications,
                {
                  cause: selectedCauseId,
                  start_date: selectedStartDate.toISOString(),
                  end_date: selectedEndDate.toISOString(),
                },
              ])
              //empty selectedCauseId and selectedStartDate and selectedEndDate
              setSelectedCauseId('')
              // setSelectedStartDate('')
              // setSelectedEndDate('')
              //set drop selectors to default values
              setSelectedCategory('')
              setSelectedCause('')
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 0,
                color: '#598F7F',
              }}
            >
              +
            </Text>
          </TouchableOpacity>

          {/* validate Touchable opacity */}
          <TouchableOpacity
            style={{
              backgroundColor: '#F6F6C9',
              borderRadius: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            onPress={() => {
              console.log('final justifications')
              console.log(justifications)
              justifValidatorHandler(justifications,failure);

              // onPeriodSelection(selectedStartDate, selectedEndDate)
              // toggleModal()
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 0,
                color: '#598F7F',
              }}
            >
              Validate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default StoppagesModalContent

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
  },
})
