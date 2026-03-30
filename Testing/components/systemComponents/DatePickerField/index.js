import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import DatePicker from "react-native-date-picker";

export const DatePickerField = ({
  value,
  onChange,
  placeholder = "Select date"
}) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return placeholder;
    return new Date(date).toLocaleDateString();
  };

  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          // borderWidth: 1,
          // padding: 10,
          // borderRadius: 20
        }}
      >
        <Text>{formatDate(value)}</Text>
      </Pressable>

      <DatePicker
        modal
        open={open}
        date={value ? new Date(value) : new Date()}
        mode="date"
        onConfirm={(date) => {
          const formatted = date.toISOString().split("T")[0];
          setOpen(false);
          onChange?.(formatted);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};