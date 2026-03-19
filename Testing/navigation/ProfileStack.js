import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ProfileScreen} from "../screens/profile/index";

const Stack = createNativeStackNavigator();

export const  ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}