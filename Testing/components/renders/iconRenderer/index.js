import React from "react";
import { Text } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DisplayText } from "../../displayComponents/text";
import LucideIcon from "../../displayComponents/icon/lucideIcons/LucideIcon";

const ICON_MAP = {
  MaterialIcons,
  Feather,
  Ionicons,
};

export function renderAdornment(adornment, value) {
  if (!adornment) return null;
  console.log("users",adornment)
  if (typeof adornment === "function") {
    return adornment(value);
  }

  if (adornment.type === "text") {
    return <DisplayText>{adornment.value}</DisplayText>;
  } else {
    return (
      <LucideIcon
        icon_name={adornment}
        size={adornment?.size || 20}
        color={adornment?.color || "#D0D0D0"}
      />
      
    );
  }

  return null;
}