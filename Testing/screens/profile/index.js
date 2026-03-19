import React from "react";
import { View, Text, Button } from "react-native";

export const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Details"
        // onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}