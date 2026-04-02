// displayComponents/FAB.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export const FAB = ({ icon, size = 56, color, onPress,resolveProps }) => {

  return (
    <View>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.fab,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color || "#0D5F7A",
        },
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
  },
  icon: {
    color: "white",
    fontSize: 24,
  },
});