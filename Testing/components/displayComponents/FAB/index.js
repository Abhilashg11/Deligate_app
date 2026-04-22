import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Animated, Pressable } from "react-native";

export const FAB = ({ icon, size = 56, color,onPress }) => {
  const [showOptions, setShowOptions] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleFAB = () => {
    const toValue = showOptions ? 0 : 1;

    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true, // ✅ important for performance
    }).start();

    setShowOptions(prev => !prev);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"], // + → × effect
  });

  return (
    <View>
      <Pressable
        onPress={toggleFAB}
        style={[
          styles.fab,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color || "#0D5F7A",
          },
        ]}
      >
        {showOptions && (
          <View style={styles.menu}>
            {["CMT", "DSP", "LMT"].map((option, index) => (
              <Pressable
                key={index}
                style={styles.option}
                onPress={()=> onPress("onAddPress",option)}
              >
                <Text>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* 🔥 Animated Icon */}
        <Animated.Text style={[styles.icon, { transform: [{ rotate }] }]}>
          {icon}
        </Animated.Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  icon: {
    color: "white",
    fontSize: 24,
  },
  menu: {
    position: "absolute",
    bottom: 60,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  option: {
    padding: 15,
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
  },
});