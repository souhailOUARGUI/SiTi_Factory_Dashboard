import React, { useState } from 'react';
import { View } from 'react-native';
import StoppageList from './stoppageList';

const StoppageComp = ({ stoppagePeriods }) => {

    const [updatedStoppagePeriods, setUpdatedStoppagePeriods] = useState(stoppagePeriods);
    const handleUpdateReason = (index, reason) => {
        const newStoppagePeriods = [...updatedStoppagePeriods];
        newStoppagePeriods[index].reason = reason;
        setUpdatedStoppagePeriods(newStoppagePeriods);
    };


    return (
        <View>
            <StoppageList
                stoppagePeriods={updatedStoppagePeriods}
                onUpdateReason={handleUpdateReason} 
            />
        </View>
    );
}


export default StoppageComp;