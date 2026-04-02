import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { DisplayText } from "../../displayComponents/text";
import LucideIcon from "../../displayComponents/icon/lucideIcons/LucideIcon";

export const LonTool = ({
  name,
  title = "LON / Risk Tool",
  label = "Level of Need — select one",
  required = false,
  options = ["Low", "Medium", "High"],
  icon = "AlertTriangle"
}) => {

  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: required ? "This field is required" : false }
  });

  return (
    <View style={{ gap: 13, marginBottom:20 }}>

      {/* 🔹 Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <LucideIcon icon_name={icon} size={15} color="#239EC4" />
          </View>
          <DisplayText style={styles.title}>{title}</DisplayText>
        </View>

        {required && <DisplayText style={styles.required}>Required</DisplayText>}
      </View>

      {/* 🔹 Label */}
      <DisplayText style={styles.label}>{label}</DisplayText>

      {/* 🔹 Segmented Control */}
      <View style={styles.segmentContainer}>
        {options.map((opt, index) => {
          const isSelected = value === opt;

          return (
            <TouchableOpacity
              key={`${opt}-${index}`}
              style={[
                styles.segment,
                isSelected && styles.activeSegment
              ]}
              onPress={() => onChange(opt)}
            >
              <DisplayText
                style={[
                  styles.segmentText,
                  isSelected && styles.activeText
                ]}
              >
                {opt}
              </DisplayText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🔴 Error */}
      {error && (
        <DisplayText style={styles.errorText}>
          {error.message}
        </DisplayText>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  iconBox: {
    backgroundColor: "#D3F4FF",
    borderRadius: 8,
    padding: 8
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#181818"
  },

  required: {
    fontSize: 10,
    color: "#B45309"
  },

  label: {
    fontSize: 12,
    color: "#999999"
  },

  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    padding: 4
  },

  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },

  activeSegment: {
    backgroundColor: "#1F6F82"
  },

  segmentText: {
    fontSize: 12,
    color: "#777"
  },

  activeText: {
    color: "#fff",
    fontWeight: "600"
  },

  errorText: {
    fontSize: 10,
    color: "red"
  }
});