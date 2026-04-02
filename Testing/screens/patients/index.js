import React from "react";
import { View, Text, Button } from "react-native";
import { StepFormRenderer } from "../../components/renders/stepFormRenderer/StepFormRenderer";
import { newPatientMeta } from "../../metadata/home/patient.metadata"

export const PatientScreen = () => {
     const handleEvents = (eventName, payload) => {
    if (eventName === 'onCardPress') {
      console.log('Team screen clicked', payload);
    } else if (eventName === 'onAddPress') {
      // navigatation.navigate('newStaffScreen');
    }
  };
  return (
     <View style={{flex:1}}>
          <StepFormRenderer
          metadata={newPatientMeta}
          onEvent={handleEvents}
          isStep={true}
          />
          {/* <LonTool/> */}
        </View>
  );
}