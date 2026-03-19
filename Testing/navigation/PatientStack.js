import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {PatientScreen} from "../screens/patients/index";
const Stack = createNativeStackNavigator();

export const PatientStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PatientScreen" 
        component={PatientScreen}
        options={{ title: "Patient" }}
      />
    </Stack.Navigator>
  );
}