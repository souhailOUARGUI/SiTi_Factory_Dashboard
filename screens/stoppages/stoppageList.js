import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const StoppageList = ({ stoppagePeriods, onUpdateReason }) => {
  const [reasons, setReasons] = useState(stoppagePeriods.map(() => ''));
  
  const handleReasonChange = (index, value) => {
    const newReasons = [...reasons];
    newReasons[index] = value;
    setReasons(newReasons);
  };
  
  const handleUpdateReason = (index) => {
    onUpdateReason(index, reasons[index]);
  };
  
  return (
    <View>
      {stoppagePeriods.map((stoppage, index) => (
        <View key={index}>
          <Text>Stoppage: {stoppage.startTime} - {stoppage.endTime}</Text>
          <TextInput 
            placeholder="Enter reason for stoppage" 
            value={reasons[index]}
            onChangeText={(value) => handleReasonChange(index, value)}
          />
          <Button 
            title="Update reason" 
            onPress={() => handleUpdateReason(index)}
          />
        </View>
      ))}
    </View>
  );
};

export default StoppageList;