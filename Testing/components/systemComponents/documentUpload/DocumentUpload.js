import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useController, useFormContext } from "react-hook-form";
import DocumentPicker from "react-native-document-picker";

import { DisplayText } from "../../displayComponents/text";
import LucideIcon from "../../displayComponents/icon/lucideIcons/LucideIcon";
import { TextBox } from "../textBox";
import { PhoneInput } from "../phoneNumber";

export const DocumentUpload = ({
  name,
  label,
  description,
  required = false,
  icon,
  title,
  container,
  textbox,
phoneinput
}) => {

  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: required ? "Document is required" : false }
  });

  // 📂 Pick file
  const handlePick = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      onChange(res); // store file

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled");
      } else {
        console.log("Error:", err);
      }
    }
  };

  return (
    <View style={{ gap: 10 }}>

      {/* 🔹 title */}
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
         <View style={styles.iconBox}>
          <LucideIcon icon_name={icon}  color="#239EC4" />
          </View> 
        
        <DisplayText style={styles.label}>{title}</DisplayText>
        </View>
        {required && <DisplayText style={styles.required}>Required</DisplayText>}
      </View>

      {/* 🔹 Upload Box */}
      <DisplayText style={{ fontSize: 10, color: "#999999" }}>{label}</DisplayText>
      <TouchableOpacity
        style={[
          styles.uploadBox,
          error && { borderColor: "red" }
        ]}
        onPress={handlePick}
      >

        {/* Icon */}
        <View style={styles.iconBox}>
          <LucideIcon icon_name="Image" size={18} color="#239EC4" />
        </View>

        {/* Title */}
        <DisplayText style={styles.title}>
          {value ? value.name : container?.title || "Upload Document"}
        </DisplayText>

        {/* Description */}
        <DisplayText style={styles.description}>
          {container?.description || "Supported formats: PDF, DOCX, JPG, PNG"}
        </DisplayText>

        {/* Button */}
        <View style={styles.button}>
          <DisplayText style={{ fontSize:10,color: "#239EC4" }}>
            {value ? "Change File" : container?.buttonLabel}
          </DisplayText>
        </View>

      </TouchableOpacity>

      {/* 🔴 Error */}
      {error && (
        <DisplayText style={styles.errorText}>
          {error.message}
        </DisplayText>
      )}
    <View>
      <TextBox
      name={textbox?.name}
      label={textbox?.label}
      placeholder={textbox?.placeholder}
      startAdornment={textbox?.startAdornment?.icon_name}
      required={textbox?.required}
      />

      <PhoneInput
      name={phoneinput?.name}
      label={phoneinput?.label}
      placeholder={phoneinput?.placeholder}
      startAdornment={phoneinput?.startAdornment?.icon_name}
      required={phoneinput?.required}
      />
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  label: {
    fontSize: 14,
    color: "#181818",
    fontWeight: "600"
  },

  required: {
    fontSize: 10,
    color: "#B45309"
  },

  uploadBox: {
    backgroundColor: "#F7F8F9",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    gap: 10
  },

  iconBox: {
    backgroundColor: "#D3F4FF",
    borderRadius: 8,
    padding: 8
  },

  title: {
    fontSize: 13,
    color: "#181818",
    fontWeight: "600",
    textAlign: "center"
  },

  description: {
    fontSize: 11,
    color: "#999999",
    textAlign: "center"
  },

  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#D3F4FF",
    borderRadius: 20
  },

  errorText: {
    fontSize: 10,
    color: "red"
  }
});