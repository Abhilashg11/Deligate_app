import React from "react";
import { View, Text, Button } from "react-native";
import { StepFormRenderer } from "../../components/renders/stepFormRenderer/StepFormRenderer";
import { newPatientMeta } from "../../metadata/home/patient.metadata"
import { BottomSheetProvider } from "../../context/BottomSheetContext";
import { FormProvider, useForm } from "react-hook-form";

export const PatientScreen = () => {
     const handleEvents = (eventName, payload) => {
    if (eventName === 'onCardPress') {
      console.log('Team screen clicked', payload);
    } else if (eventName === 'onAddPress') {
      // navigatation.navigate('newStaffScreen');
    }
  };

      const methods = useForm({
        //  defaultValues: existingData,
      mode: "onBlur",
      reValidateMode: "onChange"
    });
  return (
     <View style={{flex:1}}>
      <FormProvider {...methods}>
          <StepFormRenderer
          metadata={newPatientMeta}
          onEvent={handleEvents}
          isStep={true}
          />
          </FormProvider>
        </View>
  );
}