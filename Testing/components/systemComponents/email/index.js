import React from "react";
import { FormInput } from "../formInput";
import { TextBox } from "../textBox";

export function EmailInput( {name,
  label = "Email",
  rules,
  fieldError,
  required = false,
  placeholder,
  ...props}) {
  return (
  <TextBox
      name={name}
      label={label}
      required={required}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={placeholder || "Enter email address"}
      rules={{
        required: required && `${label || "Email"} is required`,
        pattern: {
          value: /^\S+@\S+$/i,
          message: fieldError?.message || "Invalid email address",
        },
        ...rules, // allow override from metadata
      }}
      {...props}
    />
  );
}
