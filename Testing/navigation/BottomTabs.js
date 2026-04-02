import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './HomeStack';
import { PatientStack } from './PatientStack';
import { TeamStack } from './TeamStack';
import { TaskStack } from './TaskStack';
import { ProfileStack } from './ProfileStack';
import LucideIcon from '../components/displayComponents/icon/lucideIcons/LucideIcon';
import { layout } from '../metadata/home/layout.metadata';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  const { bottomNavBar } = layout;
  const componentMap = {
    HomeStack,
    PatientStack,
    TeamStack,
    TaskStack,
    ProfileStack,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: bottomNavBar.activeColor,
        //       tabBarInactiveTintColor: bottomNavBar.inactiveColor,
        //  tabBarStyle: {
        //         backgroundColor: bottomNavBar.backgroundColor,   // <—— your metadata value
        //       },
      }}
    >
      {bottomNavBar.tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={componentMap[tab.component]}
          options={{
            tabBarIcon: ({ focused }) => (
              <LucideIcon
                icon_name={tab.icon}
                size={bottomNavBar.iconSize}
                color={
                  focused
                    ? bottomNavBar.activeColor
                    : bottomNavBar.inactiveColor
                }
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
