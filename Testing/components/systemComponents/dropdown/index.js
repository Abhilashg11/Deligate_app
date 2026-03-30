import React, { useState } from "react";
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from "react-native";
import { useController, useFormContext } from "react-hook-form";
import { useTheme } from "../../../themes/ThemeProvider";
import { DisplayText } from "../../displayComponents/text";
import { renderAdornment } from "../../renders/iconRenderer";

export const Dropdown = ({
  name,
  label,
  rules,
  required = false,
  defaultValue = null,
  placeholder = "Select option",
  options = [], // [{ label, value }]
  startAdornment,
  endAdornment,
}) => {
  const { colors } = useTheme();
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required && `${label || "This field"} is required`,
      ...rules,
    },
    defaultValue,
  });

  const selectedItem = options.find(opt => opt.value === value);
  const displayValue = selectedItem?.label;

  return (
    <View style={styles.container}>
      {/* LABEL */}
      {label && (
        <DisplayText style={{ color: colors?.textPrimary, marginBottom: 4 }}>
          {label}
        </DisplayText>
      )}

      {/* INPUT BOX */}
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors?.error : colors?.border,
            backgroundColor: colors?.inputBg,
          },
        ]}
      >
        {/* START ICON */}
        {startAdornment && (
          <View style={styles.adornment}>
            {renderAdornment(startAdornment, value)}
          </View>
        )}

        {/* VALUE / PLACEHOLDER */}
        <Text
          style={{
            flex: 1,
            color: displayValue
              ? colors?.textPrimary
              : colors?.placeholder,
          }}
        >
          {displayValue || placeholder}
        </Text>

        {/* END ICON */}
        <View style={styles.adornment}>
          {endAdornment
            ? renderAdornment(endAdornment, value)
            : <Text>▼</Text>}
        </View>
      </Pressable>

      {/* MODAL */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={[styles.dropdown, { backgroundColor: colors?.card }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={{ color: colors?.textPrimary }}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* ERROR */}
      {error && (
        <Text style={{ color: colors?.error, marginTop: 4 }}>
          {error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  adornment: {
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },

  dropdown: {
    borderRadius: 12,
    maxHeight: 250,
    paddingVertical: 8,
  },

  option: {
    padding: 12,
  },
});



// export function Dropdown({
//   name,
//   label,
//   rules,
//   required = false,
//   defaultValue = null,
//   placeholder = "Select option",
//   options = [],
//   startAdornment,
//   endAdornment,
// }) {
//   const { colors } = useTheme();
//   const { control } = useFormContext();

//   const {
//     field: { value, onChange },
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//     rules: {
//       required: required && `${label || "This field"} is required`,
//       ...rules,
//     },
//     defaultValue,
//   });

//   const selectedItem = options.find((opt) => opt.value === value);
//   const displayValue = selectedItem?.label;

//   const handlePress = () => {
//     if (Platform.OS === "ios") {
//       // Native iOS Action Sheet — looks exactly like the system picker
//       const cancelIndex = options.length;

//       ActionSheetIOS.showActionSheetWithOptions(
//         {
//           options: [...options.map((o) => o.label), "Cancel"],
//           cancelButtonIndex: cancelIndex,
//           title: label,
//         },
//         (buttonIndex) => {
//           if (buttonIndex !== cancelIndex) {
//             onChange(options[buttonIndex].value);
//           }
//         }
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {label && (
//         <Text style={[styles.label, { color: colors?.textSecondary }]}>
//           {label}
//         </Text>
//       )}

//       <Pressable
//         onPress={handlePress}
//         style={({ pressed }) => [
//           styles.inputContainer,
//           {
//             borderColor: error
//               ? colors?.error
//               : colors?.border ?? "rgba(60,60,67,0.2)",
//             backgroundColor: colors?.inputBg ?? "#FFFFFF",
//             opacity: pressed ? 0.6 : 1,
//           },
//         ]}
//       >
//         {startAdornment && (
//           <View style={styles.adornment}>
//             {renderAdornment(startAdornment, value)}
//           </View>
//         )}

//         <Text
//           style={[
//             styles.valueText,
//             {
//               color: displayValue
//                 ? colors?.textPrimary ?? "#000000"
//                 : colors?.placeholder ?? "#C7C7CC",
//             },
//           ]}
//         >
//           {displayValue || placeholder}
//         </Text>

//         <View style={styles.adornment}>
//           {endAdornment ? (
//             renderAdornment(endAdornment, value)
//           ) : (
//             // Native-feeling chevron
//             <ChevronIcon color={displayValue ? "#007AFF" : "#C7C7CC"} />
//           )}
//         </View>
//       </Pressable>

//       {error && (
//         <Text style={[styles.error, { color: colors?.error ?? "#FF3B30" }]}>
//           {error.message}
//         </Text>
//       )}
//     </View>
//   );
// }

// // Clean SVG chevron — matches iOS system icons
// function ChevronIcon({ color = "#C7C7CC" }) {
//   const Svg = require("react-native-svg").Svg;
//   const Path = require("react-native-svg").Path;
//   return (
//     <Svg width={12} height={8} viewBox="0 0 12 8">
//       <Path
//         d="M1 1.5L6 6.5L11 1.5"
//         stroke={color}
//         strokeWidth={1.8}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//     </Svg>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 13,
//     marginBottom: 6,
//     marginLeft: 4,
//     fontWeight: "400",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 0.5,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 13,
//     backgroundColor: "#FFFFFF",
//   },
//   adornment: {
//     marginHorizontal: 4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   valueText: {
//     flex: 1,
//     fontSize: 16,
//   },
//   error: {
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },
// });