import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

const MachineTimetableRow = ({ hours, machineStates }) => {
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <View
    style={{
      flex: 1,
    }}
    >
    {
      hours &&
      hours.map((hour) => (
        <View style={{margin: 0,
          flexDirection: 'row', alignItems: 'center' }}
          key={hour.id}
          >
         
   
         <View style={{marginHorizontal: 10, 
           width: 60, alignItems: 'center', justifyContent: 'center'
            }}>
           <Text
           style={ {fontSize: 14, textAlign: 'center',
           fontWeight: 'bold' ,}}
           >{hour.timestamp}:00</Text>
         </View>
         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',alignItems:'center' }}>
           {minutes.map((minute) => {
             const machineState = machineStates[minute];
             let backgroundColor = 'gray';
             if (machineState === 'working') {
               backgroundColor = 'green';
             } else if (machineState === 'not working') {
               backgroundColor = 'red';
             }
             return (
               <View
                 key={minute}
                 style={{
                   //  flex: 1,
                   height: 30,
                   width: 5,
                   marginHorizontal: 0,
                   backgroundColor,
                   borderBottomColor: 'black',
                   borderBottomWidth: 1,
                 }}
               />
             );
           })}
         </View>
       </View>
      ))

    }
    </View>
    
  );
};

export default MachineTimetableRow;


const styles = StyleSheet.create({
  HourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },


  
})
