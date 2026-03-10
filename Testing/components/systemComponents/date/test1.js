import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { Button, View } from "react-native";

export default function TestPicker() {
  const [show, setShow] = useState(false);
  console.log("Rendering TestPicker, show:", show);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Open Picker" onPress={() => setShow(true)} />
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        display="spinner"
        onConfirm={(d) => { console.log(d); setShow(false); }}
        onCancel={() => setShow(false)}
      />
    </View>
  );
}