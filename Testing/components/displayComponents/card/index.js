// components/Card.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Card({ item, config = {} }) {
  const badgeKey = config?.badge?.key;
  const badgeColors = config?.badge?.colors || {};

  const badgeValue = badgeKey ? item[badgeKey] : null;
  const color = badgeColors[badgeValue] || "gray";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {config?.title ? item[config.title] : ""}
      </Text>

      <Text>
        {config?.subtitle ? item[config.subtitle] : ""}
      </Text>

      {badgeValue && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{badgeValue}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
  },
  badge: {
    position: "absolute",
    right: 10,
    top: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
  },
});