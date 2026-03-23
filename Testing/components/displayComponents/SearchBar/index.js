// components/SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import LucideIcon from "../icon/lucideIcons/LucideIcon";

export const SearchBar = ({ 
  placeholder,
  icon,
  value,
  onChangeText

 }) => {
  return (
    <View
    style={styles.container}
    >
    <LucideIcon icon_name={icon.icon_name} size = {icon.size} color={icon.color}/>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder.title}
      placeholderClassName={placeholder.color}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#EAEAEA',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems:"center",
    padding:15,
    gap: 30
  }
})