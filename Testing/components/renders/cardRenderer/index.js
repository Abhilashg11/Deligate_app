import { View, Text, StyleSheet } from "react-native";
import { SectionRenderer } from "../sectionRenderer";


export function CardRenderer({ card }) {
  return (
    <View style={[Styles.container,
      {
        backgroundColor: card.style?.backgroundColor ?? Styles.container.backgroundColor,
        borderColor: card.style?.borderColor ?? Styles.container.borderColor,
      }
    ]}>
      {card.title && <Text>{card.title}</Text>}

      {card.sections.map((section,index) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </View>
  );
}

const Styles = StyleSheet.create({
    container: {
    borderRadius: 12,
    width: "100%",
    padding: 12,
    backgroundColor:   "#bba7cc",
    marginVertical: 8,
    borderWidth: 1,
    borderColor:  "#1b0d0d",
    }
})
