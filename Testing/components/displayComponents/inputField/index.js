import React from "react";
import { View, TextInput } from "react-native";
import { DisplayText } from "./DisplayText";
import { useTheme } from "../themes/ThemeProvider";

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  success,
  style,
  ...props
}) {
  const { colors, spacing } = useTheme();

  const borderColor = error
    ? colors.error
    : success
    ? colors.success
    : colors.border;

  return (
    <View style={{ marginBottom: spacing.md }}>
      {label && (
        <DisplayText
          variant="caption"
          style={{ marginBottom: spacing.xs }}
        >
          {label}
        </DisplayText>
      )}

      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={[
          {
            backgroundColor: colors.inputBackground,
            borderWidth: 1,
            borderColor,
            borderRadius: 6,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.sm,
            color: colors.textPrimary,
          },
          style,
        ]}
      />

      {error && (
        <DisplayText
          variant="caption"
          style={{ color: colors.error, marginTop: 4 }}
        >
          {error}
        </DisplayText>
      )}

      {!error && success && (
        <DisplayText
          variant="caption"
          style={{ color: colors.success, marginTop: 4 }}
        >
          {success}
        </DisplayText>
      )}
    </View>
  );
}
