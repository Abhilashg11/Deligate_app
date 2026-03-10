import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from '../../../themes/ThemeProvider';
import { DisplayText } from '../../displayComponents/text';
import { renderAdornment } from '../../renders/iconRenderer';

export function TextBox({
  name,
  label,
  rules,
  required = false,
  defaultValue = '',
  formatValue,
  fieldError,
  placeholder,
  transformValue,
  startAdornment,
  endAdornment,
  ...inputProps
}) {
  const { colors } = useTheme();
  const { control } = useFormContext();

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${label || 'This field'} is required`,
      ...rules,
    },
    defaultValue,
  });

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        {label && (
          <DisplayText style={{ color: colors.textPrimary, marginBottom: 4 }}>
            {label}
          </DisplayText>
        )}

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: error ? colors.error : colors.border,
              backgroundColor: colors.inputBg,
            },
          ]}
        >
        {startAdornment && (
    <View style={styles.adornment}>
      {renderAdornment(startAdornment, value) || startAdornment}
    </View>
  )}

          <TextInput
            value={formatValue ? formatValue(value) : value}
            onChangeText={text =>
              transformValue ? transformValue(text, onChange) : onChange(text)
            }
            onBlur={onBlur}
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder={placeholder || `Enter ${label || 'value'}`}
            {...inputProps}
          />

          {endAdornment && (
    <View style={styles.adornment}>
      {renderAdornment(endAdornment, value) || endAdornment}
    </View>
  )}
        </View>

        {error && (
          <Text style={{ color: colors.error, marginTop: 4 }}>
            {error.message}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  input: {
    flex: 1,
    padding: 12,
  },

  adornment: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
