// components/systemComponents/submitButton.jsx
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useFormContext } from "react-hook-form";
import { LinearGradient } from "react-native-linear-gradient";

export function SubmitButton({
  title = "Submit",
  onSubmit,
  disabled,
}) {
  const { handleSubmit, formState } = useFormContext();

  return (
    <LinearGradient colors={['#0D5F7A','#1780A0','#239EC4']}
      style={styles.container}>
    <Button
      color={"#ffffff"}
      title={formState.isSubmitting ? "Submitting..." : title}
      disabled={disabled || formState.isSubmitting}
      onPress={handleSubmit(onSubmit)}
    />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderRadius: 14,
    height:49,
    justifyContent:"center"
  },
});