import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { StepRenderer } from "../stepRenderer";
import { normalizeWorkflow } from '../../../metadata/helpers/normalizeMetadata'
import { StepProgressBar } from '../../displayComponents/stepProgressBar/index'

export function WorkflowRenderer({ metadata, onSubmit }) {

  const methods = useForm({
     mode: "onBlur",
    reValidateMode: "onChange"
  });

  const [currentStep, setCurrentStep] = useState(0);
const [stepError, setStepError] = useState(false);


  const workflow = normalizeWorkflow(metadata);

  const steps = workflow.steps || [];
  const step = steps[currentStep];

const nextStep = async () => {

  const valid = await methods.trigger();

  if (!valid) {
    setStepError(true);
    return;
  }

  setStepError(false);

  if (currentStep < steps.length - 1) {
    setCurrentStep((prev) => prev + 1);
  } else {
    methods.handleSubmit(onSubmit)();
  }
};

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <View>
     <StepProgressBar
         totalSteps={steps.length}
  currentStep={currentStep}
  hasError={stepError}
        />
        {/* Step title */}
        <Text>{step.title}</Text>

        {/* Render Step */}
        <StepRenderer step={step} />

        {/* Navigation */}
        <View style={{ flexDirection: "row", marginTop: 20 }}>

          {currentStep > 0 && (
            <Button title="Back" onPress={prevStep} />
          )}

          <Button
            title={currentStep === steps.length - 1 ? "Submit" : `Next - ${step?.title}`}
            onPress={nextStep}
          />

        </View>

      </View>
    </FormProvider>
  );
}