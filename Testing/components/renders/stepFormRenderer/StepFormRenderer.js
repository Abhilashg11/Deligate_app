import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header } from '../../displayComponents/header';
import { ComponentRenderer } from '../componentRenderer';
import { Button } from '../../displayComponents/button';

export const StepFormRenderer = ({
  metadata,
  data,
  onEvent
}) => {
  const isStep = !!metadata?.steps;

  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState(false);

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  const currentStepMeta = isStep
    ? metadata.steps[step]
    : metadata;

      const hasForm = currentStepMeta.components?.some(
  c => c.type === "form"
);

  const totalSteps = metadata?.steps?.length || 1;

  // ✅ NEXT
  const nextStep = async () => {
    const valid = await methods.trigger();

    if (!valid) {
      setStepError(true);
      return;
    }

    setStepError(false);

    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      methods.handleSubmit(handleFinalSubmit)();
    }
  };

  // ✅ BACK
  const backStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };


  // ✅ FINAL SUBMIT
  const handleFinalSubmit = (formData) => {
   // const res = await handleSubmit(formData,submitButton?.event)
    console.log("Form submit result:", formData);

    methods.reset(); // clear after submit
    setStep(0);
  };

  return (
    <FormProvider {...methods}>
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
          methods={methods}
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
            onPress={
              isStep
                ? nextStep
                : methods.handleSubmit(handleFinalSubmit)
            }
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
      </View>
    </FormProvider>
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