import { StyleSheet, View } from "react-native";
import { FormRenderer } from "../formRenderer";

export function SectionRenderer({ section }) {
  const {
    fields = [],
    columns = 1,
    gap = 12,
    layout = "stack",
  } = section;

  if (layout !== "grid") {
    return (
      <View style={{ gap }}>
        {fields.map((field) => (
          <FormRenderer key={field.name} field={field} />
        ))}
      </View>
    );
  }

  const columnWidth = 100 / columns;

  return (
    <View
      style={[
        {flexDirection: "row",
        flexWrap: "wrap",
        ...Styles.container,},
        {  backgroundColor: section.style?.backgroundColor ?? Styles.container.backgroundColor,
          borderColor: section.style?.borderColor ?? Styles.container.borderColor,}

      ]}
    >
      {fields.map((field) => {
        const span = field.fullWidth ? columns : field.span ?? 1;

        return (
          <View
            key={field.name}
            style={{
              width: `${span * columnWidth}%`,
              paddingHorizontal: gap / 2,
              marginBottom: gap,
              
            }}
          >
            <FormRenderer field={field} />
          </View>
        );
      })}
    </View>
  );
}
const Styles = StyleSheet.create({
    container: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#9275ac",
    marginVertical: 8,
    borderWidth: 1,
    borderColor:  "#441b1b",
    }
})
