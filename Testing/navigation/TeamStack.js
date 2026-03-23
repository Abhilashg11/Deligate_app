import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {TeamScreen} from "../screens/team/index";
import {NewStaffScreen} from '../screens/team/NewStaffScreen'

const Stack = createNativeStackNavigator();

export const  TeamStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TeamScreen" 
        component={TeamScreen}
        options={{ title: "Team",
          headerShown: false ,
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
         }}
      />
      <Stack.Screen
      name="newStaffScreen"
      component={NewStaffScreen}
      options={{ title: "Team",
          headerShown: false ,
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
         }}/>
    </Stack.Navigator>
  );
}