import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from '../../../themes/ThemeProvider';
import { DisplayText } from '../../displayComponents/text';

export function DateInput({
  name,
  label,
  rules,
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
      required: required && `${label || 'This field'} is required`,
      ...rules,
    },
    defaultValue,
  });

  const formatDate = date => {
    if (!date) return null;

    try {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();

      return `${day}-${month}-${year}`; // ✅ dd-mm-yyyy
    } catch {
      return null;
    }
  };
  const displayValue = formatDate(value);
  const isPlaceholder = !displayValue;

  return (
    <View style={styles.container}>
      {label && (
        <DisplayText
          style={{
            color: colors?.textPrimary || '#999999',
            marginBottom: 4,
            fontSize: 12,
          }}
        >
          {label}
        </DisplayText>
      )}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: error
            ? colors?.error || 'red'
            : colors?.border || '#EAEAEA',
          backgroundColor: colors?.inputBg || '#FFFFFF',
          padding: 12,

          borderRadius: 14,
          flexDirection: 'row', // 👈 important
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Text
          style={{
            color: isPlaceholder
              ? colors?.placeholder || '#D0D0D0' // ✅ placeholder color
              : colors?.textPrimary,
          }}
        >
          {displayValue || placeholder || 'dd-mm-yyyy'}
        </Text>
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={value ? new Date(value) : new Date()}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onChange(date.toISOString().split('T')[0]); // YYYY-MM-DD
        }}
        onCancel={() => setOpen(false)}
      />

      {error && (
        <Text style={{ color: colors?.error, marginTop: 4 }}>
          {error?.message}
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
