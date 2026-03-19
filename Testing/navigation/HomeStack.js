import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen} from "../screens/Home/index";

const Stack = createNativeStackNavigator();

export const  HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
}