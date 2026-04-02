import {
  getPendingSyncItems,
  deleteSyncItem,
  incrementRetry,
} from '../../offline-modules/offline-sync/offline-sync.repository';
import { updatePatientServerId } from '../offline-modules/patients/patients.service';

export async function processSyncQueue(api) {
  const items = await getPendingSyncItems();
  console.log('Processing sync queue items:', items);

  for (const item of items) {
    try {
      console.log('Syncing item:', item);
      const result = await api.sync(item); // POST /patients etc
      console.log('Sync result:', result);
      await updatePatientServerId(item.recordId, result.data.server_id);
      await deleteSyncItem(item.id);
      console.log('✅ Sync completed........');
    } catch (e) {
      await incrementRetry(item.id);
      console.log('Error syncing item:', e.message);
    }
  }
}
