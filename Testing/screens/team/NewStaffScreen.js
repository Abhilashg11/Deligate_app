import { Text, View } from 'react-native';
import { Header } from '../../components/displayComponents/header';
import { ComponentRenderer } from '../../components/renders/componentRenderer';
import { newStaffMeta } from '../../metadata/home/team.metadata';
import { StepFormRenderer } from '../../components/renders/stepFormRenderer/StepFormRenderer';

export const NewStaffScreen = () => {
  const documents = [
    {
      id: 'cmt',
      name: 'CMT',
      required: true,
      file: {
        name: 'cmt.jpg',
        type: 'jpg',
        date: '15 JUN 2025',
      },
      expiryDate: null,
    },
  ];

  const handleEvents = (eventName, payload) => {
    if (eventName === 'onCardPress') {
      console.log('Team screen clicked', payload);
    } else if (eventName === 'onAddPress') {
      navigatation.navigate('newStaffScreen');
    }
  };
  return (
    <View style={{ flex: 1}}>
      <StepFormRenderer
        metadata={newStaffMeta}
        onEvent={handleEvents}
        //   computed={computed}
        data={documents}
      />
    </View>
  );
};
