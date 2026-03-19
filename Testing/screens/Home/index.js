import React from "react";
import { View, Text, Button } from "react-native";

export const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="hi have"
        // onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}