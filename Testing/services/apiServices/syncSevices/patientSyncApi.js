import { createPatientRemote } from "./syncApiServices";

export const api = {
  async sync(syncItem) {
    const { table_name, action, payload } = syncItem;

    if (table_name === "patients" && action === "INSERT") {
      return createPatientRemote(JSON.parse(payload));
    }

    // later:
    // if (table_name === "patients" && action === "UPDATE") ...
    // if (table_name === "patients" && action === "DELETE") ...

    throw new Error("Unsupported sync action");
  }
};

export const syncPatient = async(item) => {
  if (item.action === 'INSERT') {
    return createPatientRemote(JSON.parse(item.payload));
  }
}