import React from "react";
import { Text } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const ICON_MAP = {
  MaterialIcons,
  Feather,
  Ionicons,
};

export function renderAdornment(adornment, value) {
  if (!adornment) return null;

  if (typeof adornment === "function") {
    return adornment(value);
  }

  if (adornment.type === "icon") {
    const IconComponent = ICON_MAP[adornment.library];

    if (!IconComponent) return null;

    return (
      <IconComponent
        name={adornment.name}
        size={adornment.size || 20}
        color={adornment.color || "#444"}
      />
    );
  }

  if (adornment.type === "text") {
    return <Text>{adornment.value}</Text>;
  }

  return null;
}