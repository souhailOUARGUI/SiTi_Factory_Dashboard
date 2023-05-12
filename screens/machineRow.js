import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const MachineTimetableRow = ({
  // hours, machineStates,
  TimeLineData,
}) => {
  // const minutes = Array.from({ length: 60 }, (_, i) => i);

  //      get and set socket data from server

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {TimeLineData.length === 0 ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          style={styles.indicator}
        />
      ) : (
        TimeLineData.map(hour => (
          <View
            style={{ margin: 0, flexDirection: 'row', alignItems: 'center' }}
            key={hour.hour}
          >
            <View
              style={{
                marginHorizontal: 0,
                width: width / 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {hour.hour}:00
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {hour.minutes.map(minute => {
                return (
                  <View
                    key={minute.minute}
                    style={{
                      //  flex: 1,
                      height: height / 25,
                      width: width / 72,
                      marginHorizontal: 0,
                      backgroundColor: minute.coups[0].col,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}
                  />
                )
              })}
            </View>
          </View>
        ))
      )}
    </View>
  )
}

export default MachineTimetableRow

const styles = StyleSheet.create({
  HourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  indicator: {
    //center this on the screen
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 1.5,
  },
})
