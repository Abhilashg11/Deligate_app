import React from "react";
import { View, Text, Button } from "react-native";
import { ComponentRenderer } from "../../components/renders/componentRenderer";
import {taskScreen} from '../../metadata/home/task.metadata'
export const TaskScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Tasks Screen</Text>
      <Button
        title="Go to Details"
        // onPress={() => navigation.navigate("Details")}
      />
      <ComponentRenderer
      metadata={taskScreen}
      />
    </View>
  );
}