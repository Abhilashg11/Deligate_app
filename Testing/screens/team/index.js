import React from 'react';
import { View, Text, Button } from 'react-native';
import { ComponentRenderer } from '../../components/renders/componentRenderer/index';
import { teamScreenMeta } from '../../metadata/home/team.metadata';
import { useNavigation, } from '@react-navigation/native';
import { StepFormRenderer } from '../../components/renders/stepFormRenderer/StepFormRenderer';
import { FormProvider, useForm } from 'react-hook-form';

export const TeamScreen = ({ navigation }) => {

     const methods = useForm({
        //  defaultValues: existingData,
      mode: "onBlur",
      reValidateMode: "onChange"
    });
  const DATA = [
    {
      id: '1',
      name: 'Maria Gonzalez',
      role: 'CMTnjnjjjbjbjbjbjb',
      status: 'VALID',
      expiryDate: '2026-05-10',
    },
    {
      id: '2',
      name: 'Sandra Lee',
      role: 'DSP',
      status: 'EXPIRING',
      expiryDate: '2026-03-25',
    },
    {
      id: '3',
      name: 'Sandra Lee',
      role: 'DSP',
      status: 'EXPIRED',
      expiryDate: '2026-03-25',
    },
    {
      id: '4',
      name: 'francis',
      role: 'DSP',
      status: 'EXPIRING',
      expiryDate: '2026-03-25',
    },
    {
      id: '5',
      name: 'de paul',
      role: 'CMT',
      status: 'EXPIRING',
      expiryDate: '2026-03-25',
    },
    {
      id: '6',
      name: 'Sandra Lee',
      role: 'DSP',
      status: 'EXPIRED',
      expiryDate: '2026-03-25',
    },
    {
      id: '7',
      name: 'vincent don',
      role: 'DSP',
      status: 'EXPIRING',
      expiryDate: '2026-03-25',
    },
    {
      id: '8',
      name: 'proal',
      role: 'CMT',
      status: 'EXPIRED',
      expiryDate: '2026-03-25',
    },
    {
      id: '9',
      name: 'mike',
      role: 'DSP',
      status: 'EXPIRING',
      expiryDate: '2026-03-25',
    },
    {
      id: '10',
      name: 'vincent',
      role: 'CMT',
      status: 'EXPIRING',
      expiryDate: '2026-03-25',
    },
    {
      id: '11',
      name: 'WICON',
      role: 'DSP',
      status: 'EXPIRED',
      expiryDate: '2026-03-25',
    },
  ];
  const total = DATA.length;
  const expiring = DATA.filter(i => i.status === 'EXPIRING').length;
  const navigatation = useNavigation();

  const computed = {
    teamSummary: `${total} members - ${expiring} expiring soon`,
  };

  const handleEvents = (eventName, payload) => {
    console.log('Event:', eventName, 'Payload:', payload);
    if (eventName === 'onCardPress') {
      console.log('Team screen clicked', payload);
    } else if (eventName === 'onAddPress') {
      navigatation.navigate('newStaffScreen',{role: payload});
    }
  };
  return (
    <View style={{ flex: 1, }}>
      <FormProvider {...methods}>
      <StepFormRenderer
        metadata={teamScreenMeta}
        onEvent={handleEvents}
        computed={computed}
        data={DATA}
        isStep={false}
      />
      </FormProvider>
    </View>
  );
};
