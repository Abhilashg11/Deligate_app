import { Text, View } from 'react-native';
import { Header } from '../../components/displayComponents/header';
import { ComponentRenderer } from '../../components/renders/componentRenderer';
import { newStaffMeta } from '../../metadata/home/team.metadata';
import { StepFormRenderer } from '../../components/renders/stepFormRenderer/StepFormRenderer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createStaff } from '../../redux-store/staff/staffSlice';

const applyRoleToMeta = (meta, role) => {
  const clone = JSON.parse(JSON.stringify(meta));

  clone.components.forEach(component => {
    const data = component.props?.data;

    if (data?.itemsByRole) {
      // ✅ replace with resolved array
      data.items = data.itemsByRole[role] || [];

      // 🔥 remove itemsByRole completely
      delete data.itemsByRole;
    }
  });

  return clone;
};

export const NewStaffScreen = () => {
  const route = useRoute();
  const role = route.params?.role || "DSP";
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, error, staffList } = useSelector((state)=> state.staff) 

const finalMeta = useMemo(() => {
  return applyRoleToMeta(newStaffMeta, role);
}, [role]);

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

    const methods = useForm({
      //  defaultValues: existingData,
    mode: "onBlur",
    reValidateMode: "onChange"
  });
  const handleEvents = (eventName, payload) => {
    // if (eventName === 'onCardPress') {
    //   console.log('Team screen clicked', payload);
    // } else if (eventName === 'onAddPress') {
    //   navigation.navigate('newStaffScreen');
    // }
    if(eventName === "CREATE_STAFF"){
      // console.log("payload",eventName,payload)
      dispatch(createStaff({ ...payload, role }))
    }

  };
  return (
    <View style={{ flex: 1}}>
      <FormProvider {...methods}>
      <StepFormRenderer
        metadata={finalMeta}
        onEvent={handleEvents}
        role={role}
        //   computed={computed}
        data={documents}
      />
      </FormProvider>
    </View>
  );
};
