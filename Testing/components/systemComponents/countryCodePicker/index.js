// CountryCodePicker.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

export function CountryCodePicker({ onSelect }) {
  const [country, setCountry] = useState({
    cca2: "IN",
    callingCode: ["91"],
  });
  const [visible, setVisible] = useState(false);

  const onCountrySelect = (c) => {
    setCountry(c);
    onSelect?.(c.callingCode[0]);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          +{country.callingCode[0]}
        </Text>
      </TouchableOpacity>

      <CountryPicker
        withFilter
        withFlag
        withCallingCode
        withEmoji
        visible={visible}
        onSelect={onCountrySelect}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
