import React from "react";
import { View, Text, Button } from "react-native";
import { ComponentRenderer } from '../../components/renders/componentRenderer/index'
import { teamScreenMeta } from '../../metadata/home/team.metadata'

export const TeamScreen = ({ navigation }) => {
  const DATA = [
  {
    id: "1",
    name: "Maria Gonzalez",
    role: "CMT",
    status: "VALID",
    expiryDate: "2026-05-10",
  },
  {
    id: "2",
    name: "Sandra Lee",
    role: "DSP",
    status: "EXPIRING",
    expiryDate: "2026-03-25",
  },
];
  return (
    <View
    style={{margin:10}}
    >
      <Text>Team Screen</Text>
      <ComponentRenderer metadata={teamScreenMeta} data={DATA}/>
    </View>
  );
}