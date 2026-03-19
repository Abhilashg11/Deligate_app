// components/FilterChips.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function FilterChips({ options, selected, onSelect }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onSelect(opt.value)}
          style={{
            padding: 8,
            borderRadius: 20,
            marginRight: 8,
            backgroundColor:
              selected === opt.value ? "#0a7ea4" : "#fff",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color:
                selected === opt.value ? "#fff" : "#000",
            }}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}