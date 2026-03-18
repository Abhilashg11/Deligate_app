import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavIcon = ({ name, size, color, badgeCount, position }) => {
  return (
    <View style={styles.iconWrapper}>
      <Ionicons name={name} size={size} color={color} position={position} />

      {Number(badgeCount) > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount > 99 ? '99+' : badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

export default NavIcon;

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#dc2626', // red-600
    borderRadius: 7,
    minWidth: 12,
    height: 12,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});
