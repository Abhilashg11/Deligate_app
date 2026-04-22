import React from 'react';
import { View, Text, Button } from 'react-native';
import { DocumentUpload } from '../../components/systemComponents/documentUpload/DocumentUpload';
import { example } from '../../metadata/home/team.metadata';
import { LonTool } from '../../components/systemComponents/lonTool/LonTool';
import { InputTile } from '../../components/systemComponents/inputTile/InputTile';
import {inputile} from "../../metadata/home/team.metadata"

export const HomeScreen = ({ navigation }) => {



  const handleEvents = (eventName, payload) => {
    if (eventName === 'onCardPress') {
      console.log('Team screen clicked', payload);
    } else if (eventName === 'onAddPress') {
      // navigatation.navigate('newStaffScreen');
    }
    else if(eventName === "Add_medication"){

    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        margin: 20,
      }}
    >
      <Text>Home Screen</Text>
      {/* <DocumentUpload
      /> */}
      {/* <StepFormRenderer
      metadata={example}
      onEvent={handleEvents}
      isStep={false}
      /> */}
      {/* <LonTool/> */}
    </View>
  );
};
