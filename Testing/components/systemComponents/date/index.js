import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { useController, useFormContext } from "react-hook-form";
import { useTheme } from "../../../themes/ThemeProvider";
import { DisplayText } from "../../displayComponents/text";

export function DateInput({
  name,
  label,
  rules,
  fieldError,
  placeholder,
  required = false,
  defaultValue = null,
}) {
  const { colors } = useTheme();
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required && `${label || "This field"} is required`,
      ...rules,
    },
    defaultValue,
  });

  const formatDate = (date) => {
    if (!date) return placeholder || "Select date";
    return new Date(date + "T00:00:00").toLocaleDateString();
  };
  
  return (
    <View style={styles.container}>
      {label && (
        <DisplayText style={{ color: colors.textPrimary, marginBottom: 4 }}>
          {label}
        </DisplayText>
      )}

      <Pressable
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          backgroundColor: colors.inputBg,
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: value ? colors.textPrimary : colors.placeholder }}>
          {formatDate(value)}
        </Text>
      </Pressable>

      <DatePicker
        modal
        open={open}
        date={value ? new Date(value) : new Date()}
        mode="date"
        onConfirm={(date) => {
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
  console.log("Selected Date:", formattedDate);
  setOpen(false);
  onChange(formattedDate);
}}
        onCancel={() => setOpen(false)}
      />

      {error && (
        <Text style={{ color: colors.error, marginTop: 4 }}>
          {fieldError?.message || error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
    marginBottom: 16,
  },
});