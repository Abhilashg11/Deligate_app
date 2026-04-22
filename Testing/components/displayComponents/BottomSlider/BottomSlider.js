import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useFormContext } from "react-hook-form";

import { useBottomSheet } from "../../../context/BottomSheetContext";
import { FormRenderer } from "../../renders/formRenderer";
import { BlurView } from "@react-native-community/blur";

export const BottomSlider = () => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const { sheetData, closeSheet } = useBottomSheet() || {};
  const { handleSubmit, getValues, setValue } = useFormContext();

  // console.log("BottomSlider context:", useBottomSheet());

  // 🔥 control open/close
  useEffect(() => {
    if (sheetData) {
       requestAnimationFrame(() => {
      sheetRef.current?.snapToIndex(0);
    });
    } else {
       sheetRef.current?.close(); 
    }
  }, [sheetData]);

  // ❌ don’t render if nothing to show
  const isOpen = !!sheetData;

  // ✅ handle submit (dynamic)
  const onSubmit = (data) => {
    const formKey = sheetData?.name;

    // Example: adding item to array (like medications)
    if (sheetData?.mode === "addToList") {
      const existing = getValues(sheetData.listName) || [];
      const newItem = getValues(formKey);

      setValue(sheetData.listName, [...existing, newItem]);
      setValue(formKey, {}); // reset sub form
    }

    console.log("BOTTOM SHEET SUBMIT:", data);

    closeSheet();
  };

   const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
      pressBehavior="close" // 🔥 click outside to close
    />
  );
  return (
<>

    <BottomSheet
  ref={sheetRef}
  index={-1}
  snapPoints={snapPoints}
  enablePanDownToClose
  onClose={closeSheet}
   backdropComponent={renderBackdrop} 
  //  pressBehavior="close"
  backgroundStyle={styles.sheetBackground}
  handleIndicatorStyle={styles.handle}
>
  <BottomSheetView style={{ flex: 1,padding: 10 }}>

    {/* 🔹 HEADER */}
    <View style={styles.header}>
      <Text style={styles.title}>
        {sheetData?.title || "Form"}
      </Text>
    </View>

    {/* <View style={styles.divider} /> */}

    {/* 🔹 SCROLLABLE FORM */}
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {sheetData && (
        <FormRenderer
          components={sheetData?.components}
          title={sheetData?.title}
          header={false}
          name={sheetData?.name}
          showSubmit
          submitLabel={sheetData?.submitLabel || "Save"}
          onSubmit={onSubmit}
        />
      )}
      <Button title="cancel" onPress={closeSheet}/>
    </ScrollView>

  </BottomSheetView>
</BottomSheet>
</>
  );
};

const styles = StyleSheet.create({
  // 🔹 Sheet background
  sheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  // 🔹 Drag handle (top indicator)
  handle: {
    backgroundColor: "#D1D5DB",
    width: 40,
    height: 4,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 8,
  },

  // 🔹 Main content container
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // 🔹 Header section (title + close)
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 10
  },

  // 🔹 Title
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#239EC4",
  },

  // 🔹 Close button
  closeText: {
    fontSize: 14,
    color: "#2563EB",
  },

  // 🔹 Divider
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 12,
  },

  // 🔹 Form wrapper
  formContainer: {
    flexGrow: 1,
    gap: 12,
  },

  // 🔹 Footer (if you want sticky button later)
  footer: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 10,
    marginTop: 10,
  },
});