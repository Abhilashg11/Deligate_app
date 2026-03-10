// components/renders/actionRenderer.jsx
import React from "react";
import {SubmitButton} from '../../systemComponents/submitButton';

export function ActionRenderer({ action, onSubmit, userRole="nurse" }) {
   if (action.roles && !action.roles.includes(userRole)) {
    return null;
  }

  switch (action.type) {
    case "submit":
      return (
        <SubmitButton
          title={action.label}
          onSubmit={onSubmit}
        />
      );

    default:
      return null;
  }
}