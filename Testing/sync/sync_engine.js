import {
  getPendingSyncItems,
  deleteSyncItem,
  incrementRetry
} from '../offline-modules/offline-sync/offline-sync.repository';


import { syncPatient } from './handlers/patient_sync';
import { syncStaff } from './handlers/staff_sync';

const handlers = {
  patients: syncPatient,
  staff: syncStaff,
};

export async function processSyncQueue() {
  const items = await getPendingSyncItems();
  console.log('Processing sync queue, items:', items);

  for (const item of items) {
    try {
      const handler = handlers[item.table_name];

      if (!handler) {
        console.warn(`No sync handler for ${item.table_name}`);
        continue;
      }

      const result = await handler(item); // handler handles its own logic
      if (result?.postSync) {
        await result.postSync();
      }

      await deleteSyncItem(item.id);

    } catch (e) {
      console.log("Error syncing item:", e.message);
      await incrementRetry(item.id);
    }
  }
}