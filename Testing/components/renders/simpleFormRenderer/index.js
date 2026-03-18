import React from "react";
import { View, Button } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { FormRenderer } from "../formRenderer";

export const SimpleFormRenderer = ({ metadata, onSubmit }) => {

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  const { fields = [] } = metadata;
  console.log("====",metadata)
  return (
    <FormProvider {...methods}>
      <View>

        {fields.map((field) => (
          <FormRenderer key={field.name} field={field} />
        ))}

        {/* <Button
          title={metadata.submitLabel || "Submit"}
          onPress={methods.handleSubmit(onSubmit)}
        /> */}

      </View>
    </FormProvider>
  );
}