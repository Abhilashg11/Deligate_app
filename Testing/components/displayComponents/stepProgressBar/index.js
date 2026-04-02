import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { DisplayText } from "../text";

export function StepProgressBar({ totalSteps, currentStep, hasError }) {

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentStep + 1,
      duration: 650,
      useNativeDriver: false
    }).start();
  }, [currentStep]);

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {

        const animatedWidth = progressAnim.interpolate({
          inputRange: [index, index + 1],
          outputRange: ["0%", "100%"],
          extrapolate: "clamp"
        });

        return (
          <View key={index} style={styles.segment}>

            <Animated.View
              style={[
                styles.fill,
                {
                  width: animatedWidth,
                  backgroundColor: hasError && index === currentStep
                    ? "#FF4D4F"
                    : "#4A6CF7"
                }
              ]}
            />

          </View>
        );
      })}
      <View>
        <DisplayText
        style={{fontSize:12}}
        >{currentStep + 1 }/{totalSteps}</DisplayText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    alignItems: "center"
  },

  segment: {
    flex: 1,
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    borderRadius: 4
  }

});