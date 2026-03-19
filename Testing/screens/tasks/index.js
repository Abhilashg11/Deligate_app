import React from "react";
import { View, Text, Button } from "react-native";

export const TaskScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Tasks Screen</Text>
      <Button
        title="Go to Details"
        // onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}