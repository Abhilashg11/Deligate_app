// components/Card.js
import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { DisplayText } from "../text";

export default function Card({ item, config = {}, onEvent }) {

  const badgeKey = config?.badge?.key;
  const badgeColors = config?.badge?.colors || {};

  const badgeValue = badgeKey ? item[badgeKey] : null;
  const color = badgeColors[badgeValue] || "gray";

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        if (onEvent) {
          onEvent("onCardPress", item);  // 👈 FIRE THE EVENT
        }
      }}
    >
      {badgeValue && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <DisplayText style={styles.badgeText}>{badgeValue}</DisplayText>
        </View>
      )}
      <View style={styles.row}>
      <View style={styles.avatarPlaceholder}>
      <Image
      source={require('../../../assets/person.png')}
      style={styles.avatar}
      />
      </View>
      
     <View style={styles.info}>
      <DisplayText style={styles.title(config?.title)}>
        {config?.title?.display ? item[config?.title.display] : ""}
      </DisplayText>
      <View style={styles.subtitle}>
      <DisplayText style={styles.subtitleText(config?.subtitle)}>
        {config?.subtitle?.display  ? item[config?.subtitle?.display ] : ""}
      </DisplayText>
      </View>
      </View>
 </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 14,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2,
    borderColor:"#EAEAEA",
    borderWidth:1,
    shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.10,
  shadowRadius: 8,
  },
title: (metadata = {}) => ({
  fontWeight: metadata?.weight || "bold",
  fontSize: metadata?.size || 14,
  color: metadata?.color || "#000",
}),
  badge: {
 position: "absolute",
    top: -1,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    minWidth: 85,
    alignItems:"center"
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },
    row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
   avatar: {
    width: 40,
    height: 40,
    borderRadius:30
  },
  info: {
    gap: 5,
    flexDirection:"column"
  },
  subtitle: {
    justifyContent:"center",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#2A8CFF",
    alignItems:"center",
    paddingHorizontal: 12,   
    paddingVertical: 1,
    alignSelf: "flex-start",
  },
subtitleText: (metadata = {}) => ({
  fontSize: metadata?.size || 10,
  fontWeight: metadata?.weight || "500",
  color: metadata?.color || "#2A8CFF",
}),
});