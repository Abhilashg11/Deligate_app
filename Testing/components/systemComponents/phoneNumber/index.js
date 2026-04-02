import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from '../../../themes/ThemeProvider';
import { DisplayText } from '../../displayComponents/text';
import { TextBox } from '../textBox';

export function PhoneInput({
  name,
  label,
  rules,
  required = false,
  fieldError,
  countryCode = '+1',
  placeholder,
  startAdornment,
  ...props
}) {
  const formatPhone = value => {
    if (!value) return '';

    const digits = value.replace(/\D/g, '').slice(0, 10);

    if (digits.length === 0) return '';
    if (digits.length < 4) return `(${digits}`;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleChange = (text, onChange) => {
    const digits = text.replace(/\D/g, '').slice(0, 10);
    onChange(digits);
  };

  return (
    <View>
      <TextBox
        name={name}
        label={label}
        keyboardType="number-pad"
        placeholder={placeholder || '(555) 123-4567'}
        formatValue={formatPhone}
        transformValue={handleChange}
        startAdornment={startAdornment ||<Text>{countryCode}</Text>}
        rules={{
          required: required && `${label || 'Phone number'} is required`,
          validate: value => {
            if (!value) return true;
            if (!/^\d{10}$/.test(value)) {
              return (
                fieldError?.message || 'Enter a valid 10 digit phone number'
              );
            }
            return true;
          },
          ...rules,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 2,
    marginBottom: 16,
  },
});
