import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import MetaData from '../meta_data/metadata.json';
import BottomNavbar from '~/containers/navbar_container/bottomNavbar/BottomNavbar';
import TopNavbar from '~/containers/navbar_container/TopNavbar';
import layoutTemplate from '../template/layoutTemplate.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const MainLayout = () => {
  const insets = useSafeAreaInsets();
  const navHeight =
    Platform.OS === 'ios'
      ? MetaData.topNavigationBar.navHeight.ios + insets.top || 12
      : MetaData.topNavigationBar.navHeight.android + (StatusBar.currentHeight || 0) || 10
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <TopNavbar metadata={MetaData} topNavBarMeta={layoutTemplate} />
      </View>

      {/* Main Content */}
      <View style={{ paddingTop: navHeight, flex: 1 }}>
        <BottomNavbar metadata={MetaData} bottomNavBarMeta={layoutTemplate} />
      </View>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
