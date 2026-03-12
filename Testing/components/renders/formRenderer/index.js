import { Button, Text, View } from "react-native";
import { EmailInput } from "../../systemComponents/email";
import { PhoneInput } from "../../systemComponents/phoneNumber";
import { TextArea } from "../../systemComponents/textArea";
import { TextBox } from "../../systemComponents/textBox";
import { DateInput } from "../../systemComponents/date";
import { UploadDocument } from '../../systemComponents/uploadDocument/index'


const FIELD_MAP = {
  text: TextBox,
  email: EmailInput,
  phone: PhoneInput,
  textarea: TextArea,
  date: DateInput,
  uploaddocument: UploadDocument
};


export function FormRenderer({ field }) {
  const Component = FIELD_MAP[field.type.toLowerCase()];
  if (!Component) return null;

  return (
    <View >
  <Component {...field} />
</View>
);
}

