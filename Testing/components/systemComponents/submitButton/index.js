// components/systemComponents/submitButton.jsx
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useFormContext } from "react-hook-form";

export function SubmitButton({
  title = "Submit",
  onSubmit,
  disabled,
}) {
  const { handleSubmit, formState } = useFormContext();

  return (
    <View 
      style={styles.container}>
    <Button
    color={"#ffffff"}
      title={formState.isSubmitting ? "Submitting..." : title}
      disabled={disabled || formState.isSubmitting}
      onPress={handleSubmit(onSubmit)}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    
     backgroundColor: "#833cb8",
  },
});