import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { pick } from "@react-native-documents/picker";
import { useController, useFormContext } from "react-hook-form";

export function UploadDocument({
  name,
  label,
  rules,
  required = false
}) {

  const { control } = useFormContext();

  const {
    field: { onChange, value }
  } = useController({
    name,
    control,
    rules,
    defaultValue: null
  });

  const [fileName, setFileName] = useState(value?.name || "");

  const pickDocument = async () => {
    try {

      const result = await pick({
        allowMultiSelection: false
      });

      const file = result[0];

      setFileName(file.name);

      onChange(file);

    } catch (err) {
      if (err?.code === "DOCUMENT_PICKER_CANCELED") {
        return;
      }
      console.warn(err);
    }
  };

  const removeFile = () => {
    setFileName("");
    onChange(null);
  };

  return (
    <View style={styles.container}>

      {label && (
        <Text style={styles.label}>
          {label} {required && "*"}
        </Text>
      )}

      {!fileName ? (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickDocument}
        >
          <Text style={styles.uploadText}>Upload Document</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.fileContainer}>

          <Text style={styles.fileName}>
            {fileName}
          </Text>

          <TouchableOpacity onPress={removeFile}>
            <Text style={styles.removeText}>
              Remove
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginVertical: 10
  },

  label: {
    fontSize: 14,
    marginBottom: 6
  },

  uploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },

  uploadText: {
    color: "#4A6CF7",
    fontWeight: "600"
  },

  fileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8
  },

  fileName: {
    flex: 1
  },

  removeText: {
    color: "red",
    fontWeight: "600"
  }

});