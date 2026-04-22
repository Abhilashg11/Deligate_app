import React, { useRef, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View, Text } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FormRenderer } from '../../renders/formRenderer';
import { useBottomSheet } from '../../../context/BottomSheetContext';

export const InputTile = ({
  metadata,
  data,
  components = [],
  title,
  onEvent,
  name,
  buttonLabel,
  label="Add medication"
}) => {

  const { openSheet } = useBottomSheet()

  // const openSheet = () => {
  //   setIsOpen(true);
  // };

  // const closeSheet = () => {
  //   setIsOpen(false);
  // };
  console.log("InputTile context:", useBottomSheet());

  const handleSheet = () => {
    console.log("pressed",components)
    openSheet({
      title: buttonLabel,
      name: name,
      components: components
    })
  }

  return (
    <>
      <Pressable style={styles.addContainer} onPress={handleSheet}>
        <Text style={styles.label}>{buttonLabel || "press"}</Text>
      </Pressable>

    </>
  );
};

const styles = StyleSheet.create({
  addContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D0D0D0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    color: '#666',
  },
  sheetContent: {
    flex: 1,
    padding: 20,
  },
});