import { Button, StyleSheet, View } from "react-native";
import { CardRenderer } from "../cardRenderer";
import { FormProvider, useForm } from "react-hook-form";
import { ActionRenderer } from "../actionRenderer";

import { createPatient } from "../../../offline-modules/patients/patients.service"
import { processSyncQueue } from "../../../sync/processSyncQueue";
import { api } from "../../../services/apiServices/syncSevices/patientSyncApi";


export function ScreenRenderer({ metadata }) {

  const SERVICE_MAP = {
    "createpatient": createPatient,
  }
  const methods = useForm({ 
    mode: "onBlur",
    reValidateMode: "onChange"
   });
   
     const onSubmit = async (data) => {
       try {
      const serviceFunction = SERVICE_MAP[metadata.submit.service?.toLowerCase()];
      const localId = await serviceFunction(data);
      await processSyncQueue(api);
      console.log("Saved locally:", localId);
      console.log("Form Data:", data);  
    } catch (error) {
      console.error("Form submission error:", error);
    }

   }

  return (
    <FormProvider {...methods}>
      {metadata.cards.map((card) => (
        <CardRenderer key={card.id} card={card} />
    ))}
   
    {
      metadata.actions.map(action => (
        <ActionRenderer
          key={action.label}
          action={action}
          onSubmit={onSubmit}
        />
      ))
    }
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  floatingBar: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    padding: 12,
    backgroundColor: "#640707",
    borderRadius: 16,
    elevation: 8,
  },
});