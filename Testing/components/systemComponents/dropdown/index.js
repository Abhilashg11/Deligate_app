import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from '../../../themes/ThemeProvider';
import { DisplayText } from '../../displayComponents/text';
import { renderAdornment } from '../../renders/iconRenderer';

export const Dropdown = ({
  name,
  label,
  rules,
  required = false,
  defaultValue = null,
  placeholder = 'Select option',
  options = [], // [{ label, value }]
  startAdornment,
  endAdornment
}) => {
  const { colors } = useTheme();
  const { control } = useFormContext();

  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState(null);
  const [icon,setIcon] = useState("ChevronDown")

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

  const selectedItem = options.find(opt => opt.value === value);
  const displayValue = selectedItem?.label;

  return (
    <View style={styles.container}>
      {/* LABEL */}
      {label && (
        <DisplayText style={{ color: "#999999",fontSize: 12, marginBottom: 4, }}>
          {label}
        </DisplayText>
      )}

      {/* INPUT BOX */}
      <Pressable
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
        onPress={(e) => {
          e.stopPropagation();
          setOpen(prev => !prev)
          setIcon(prev => prev === "ChevronDown" ? "ChevronUp" : "ChevronDown");
        }
          
        }
        style={styles.inputContainer}
      >
        {/* START ICON */}
        {startAdornment && (
          <View style={styles.adornment}>
            {renderAdornment(startAdornment, value)}
          </View>
        )}

        {/* VALUE / PLACEHOLDER */}
        <Text
          style={{
            flex: 1, color: displayValue ? "#181818" :"#D0D0D0"
          }}
        >
          {displayValue || placeholder}
        </Text>

        {/* END ICON */}
        <View style={styles.adornment}>
          {endAdornment || icon
           ? renderAdornment(endAdornment || icon, value) : <Text>▼</Text>}
        </View>
      </Pressable>

      {/* DROPDOWN */}
      {open && layout && (
        <ScrollView
          style={[
            styles.dropdown,
            {
              width: layout.width,
            },
          ]}
        >
          {options.map((item) => {
            const isSelected = value === item.value;

            return (
    
              <Pressable
                key={item.value}
                style={[
                  styles.option,
                  isSelected && { backgroundColor: '#0D5F7A' },
                ]}
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                   setIcon("ChevronDown");
                }}
              >
                
                <DisplayText
                  style={{
                    color: isSelected
                      ? '#fff'
                      : colors?.textPrimary,
                  }}
                >
                  {item.label}
                </DisplayText>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      {/* ERROR */}
      {error && (
        <Text style={{ color: colors?.error, marginTop: 4 }}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
    position: 'relative', // 🔥 important for absolute dropdown
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderColor: "#EAEAEA"
  },

  adornment: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    position: 'absolute',
    top: '100%', // 👈 directly below input
    left: 0,
    marginTop: 4,
    borderRadius: 12,
    maxHeight: 150,
    backgroundColor: '#fcfcfc',

    // Shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 999, // 🔥 important
  },

  option: {
    padding: 12,
    alignItems: "center",
    borderRadius: 10
  },
});