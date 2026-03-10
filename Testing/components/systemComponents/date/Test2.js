import React, { useState } from "react";
import { Button, View } from "react-native";
import DatePicker from "react-native-date-picker";

export default function Test2() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
console.log("Selected date:", date);
  return (
    <View>
      <Button title="Open Date Picker" onPress={() => setOpen(true)} />
      
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}