import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {TeamScreen} from "../screens/team/index";

const Stack = createNativeStackNavigator();

export const  TeamStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TeamScreen" 
        component={TeamScreen}
        options={{ title: "Team" }}
      />
    </Stack.Navigator>
  );
}