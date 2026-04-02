import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { useTheme } from '../../../themes/ThemeProvider';

export function FormInput({ control, name, label, rules, ...inputProps }) {
  const { colors, isDarkMode } = useTheme();
  console.group('name', name);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 16 }}>
          {label && <Text style={{ color: colors.textPrimary }}>{label}</Text>}

          <TextInput
            value={value}
            onChangeText={onChange}
            placeholderTextColor={colors.placeholder}
            style={{
              borderWidth: 1,
              borderColor: error ? colors.error : colors.border,
              backgroundColor: colors.inputBg,
              color: colors.textPrimary,
              padding: 12,
              borderRadius: 8,
            }}
            {...inputProps}
          />

          {error && (
            <Text style={{ color: colors.error, marginTop: 4 }}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
