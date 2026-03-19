// components/SearchBar.js
import React from "react";
import { TextInput } from "react-native";

export const SearchBar = ({ placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        backgroundColor: "#f2f2f2",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    />
  );
}