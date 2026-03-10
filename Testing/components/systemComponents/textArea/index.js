import React from "react";
import { FormInput } from "../formInput";
import { TextBox } from "../textBox";

export function TextArea(props) {
  return (
    <TextBox
      {...props}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
    />
  );
}
