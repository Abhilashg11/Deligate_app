import { StyleSheet, View } from "react-native";
import { EmailInput } from "../../systemComponents/email";
import { PhoneInput } from "../../systemComponents/phoneNumber";
import { TextArea } from "../../systemComponents/textArea";
import { TextBox } from "../../systemComponents/textBox";
import { DateInput } from "../../systemComponents/date";
import LucideIcon from "../../displayComponents/icon/lucideIcons/LucideIcon";
import { DisplayText } from "../../displayComponents/text";
import  { Dropdown }  from "../../systemComponents/dropdown"

export function FormRenderer({
  title,
  components = [],
  required,
  icon,
  size,
  color,
  name,
  // ✅ NEW
  layout = "stack",
  columns = 1,
  gap = 12,
}) {
  const FIELD_MAP = {
    text: TextBox,
    email: EmailInput,
    phone: PhoneInput,
    textarea: TextArea,
    date: DateInput,
    dropdown: Dropdown
  };

  const columnWidth = 100 / columns;

  return (
    <View>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.titleIcon}>
            <LucideIcon icon_name={icon} size={size} color={color} />
          </View>
          <DisplayText style={styles.title}>{title}</DisplayText>
        </View>

        {required && (
          <DisplayText style={styles.required}>required</DisplayText>
        )}
      </View>

      {/* 🔥 STACK LAYOUT */}
      {layout !== "grid" && (
        <View style={{ gap }}>
          {components.map((field, index) => {
            const Component = FIELD_MAP[field.type];
            if (!Component) return null;

            return (
              <Component
                key={index}
                {...field}
                name={`${title}.${field.name}`}
              />
            );
          })}
        </View>
      )}

      {/* 🔥 GRID LAYOUT */}
      {layout === "grid" && (
        <View style={styles.gridContainer}>
          {components.map((field, index) => {
            const Component = FIELD_MAP[field.type];
            if (!Component) return null;

            const span = field.fullWidth ? columns : field.span ?? 1;
            console.log(`Rendering field "${field.name}" and title ${title}`);
            return (
              <View
                key={index}
                style={{
                  width: `${span * columnWidth}%`,
                  paddingHorizontal: gap / 2,
                  marginBottom: 0,
                }}
              >
                <Component
                  {...field}
                  name={`${name}.${field.name}`}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  titleIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#D3F4FF",
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
  },

  required: {
    color: "#B45309",
    fontSize: 10,
  },

  // 🔥 GRID CONTAINER
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});