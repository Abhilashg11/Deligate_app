import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {TaskScreen} from "../screens/tasks/index";

const Stack = createNativeStackNavigator();

export const  TaskStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TaskScreen" 
        component={TaskScreen}
        options={{ title: "Task" }}
      />
    </Stack.Navigator>
  );
}