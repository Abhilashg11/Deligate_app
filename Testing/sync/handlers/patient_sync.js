import { createPatientRemote } from '../../offline-modules/patients/patients.api';
import { updatePatientServerId } from '../../offline-modules/patients/patients.service';


export const syncPatient = async (item) => {
  const payload = JSON.parse(item.payload);

  switch (item.action) {
    case 'INSERT': {
      const res = await createPatientRemote(payload);
      const serverId = res?.data?.server_id;

      if (!serverId) {
        throw new Error("Server did not return server_id");
      }

      return {
        postSync: async () => {
          await updatePatientServerId(
            item.record_id,   // local_id
            serverId
          );
        }
      };
    }

    default:
      throw new Error('Unknown sync action');
  }
};