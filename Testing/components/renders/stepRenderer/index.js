import React from "react";
import { View, Text } from "react-native";
import { CardRenderer } from "../cardRenderer";

export function StepRenderer({ step }) {

  return (
    <View>

      {step.cards?.map((card) => (
        <CardRenderer key={card.id} card={card} />
      ))}

    </View>
  );
}