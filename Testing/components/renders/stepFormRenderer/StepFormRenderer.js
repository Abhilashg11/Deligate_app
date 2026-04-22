import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header } from '../../displayComponents/header';
import { ComponentRenderer } from '../componentRenderer';
import { Button } from '../../displayComponents/button';
import { BottomSheetProvider } from '../../../context/BottomSheetContext';
import { BottomSlider } from '../../displayComponents/BottomSlider/BottomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { createStaff } from '../../../redux-store/staff/staffSlice'

export const StepFormRenderer = ({
  metadata,
  data,
  onEvent,
  role,
  header,
  children
}) => {
  const isStep = !!metadata?.steps;
  console.log("metadata",metadata)
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState(false);
  const formMethods = useFormContext();

const trigger = formMethods?.trigger;
const handleSubmit = formMethods?.handleSubmit;
const reset = formMethods?.reset;
  const dispatch = useDispatch();

  const staffState = useSelector((state)=> state.staff) 

  console.log("staffList",staffState)



  const currentStepMeta = isStep
    ? metadata.steps[step]
    : metadata;

      const hasForm = currentStepMeta.components?.some(
  c => c.type === "form"
);

  const totalSteps = metadata?.steps?.length || 1;

  // ✅ NEXT
const nextStep = async () => {
  if (!trigger) {
    // no form → just move step
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    }
    return;
  }

  const valid = await trigger();

  if (!valid) {
    setStepError(true);
    return;
  }

  setStepError(false);

  if (step < totalSteps - 1) {
    setStep(prev => prev + 1);
  } else {
    handleSubmit(handleFinalSubmit)();
  }
};

  // ✅ BACK
  const backStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };
  console.log("isStep",isStep)

  // ✅ FINAL SUBMIT
const handleFinalSubmit = (data) => {
  const eventName = metadata?.submitButton?.event || "onSubmit";
  onEvent(eventName, data);

    reset(); // clear after submit
    setStep(0);
};

  return (

 
        <View style={{flex: 1}}>
      <View style={styles.container}>

        {/* 🔹 HEADER */}
        <Header
          {...currentStepMeta?.headerProps}
          isStep={isStep}
          totalSteps={totalSteps}
          currentStep={step}
          hasError={stepError}
          onBack={backStep}
        />

        {/* 🔹 BODY */}
        <ComponentRenderer
          metadata={currentStepMeta}
          data={data}
          onEvent={onEvent}
          role={role}
        />

        {/* 🔹 FOOTER */}
       

      </View>
      <View style={styles.footer}>
         { hasForm &&  (
          <View style={{ marginHorizontal: 20, gap: 10}}>
          <Button
            title={
              isStep
                ? (step === totalSteps - 1 ? "Submit" : "Next")
                : metadata?.submitButton?.label || "Submit"
            }
            onPress={isStep ? nextStep : handleSubmit(handleFinalSubmit)}
          />
           {isStep && step > 0 && (
            <Button 
            gradientColors={['#A85C5C', '#c46464', '#cd8686']}
            title="Cancel" onPress={backStep}
             />
          )}
{/* #bd5757 */}
        </View>
      )}
      </View>
      <View>
        
      </View>
      {/* <BottomSlider/> */}
      </View>
 
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // marginHorizontal: 10,
    gap: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    margin: 10,
    marginTop: 60 
  }
});