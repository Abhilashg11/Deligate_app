// src/offline-modules/offline-sync/offline-sync.service.js

import {
  insertSyncItem,
  getPendingSyncItems,
  deleteSyncItem,
  incrementRetry
} from "./offline-sync.repository";

export async function addToSyncQueue({ table, recordId, action, payload }) {
  
  console.log('Adding to sync queue:', { table, recordId, action, payload });
  await insertSyncItem({ table, recordId, action, payload });
}

/**
 * This will be called later when internet is available
 */
// export async function processSyncQueue(api) {
//   const items = await getPendingSyncItems();

//   for (const item of items) {
//     try {
//       // example API call
//       await api.sync(item);

//       // if successful → remove from queue
//       await deleteSyncItem(item.id);
//     } catch (err) {
//       console.error("Sync failed:", err);
//       await incrementRetry(item.id);
//     }
//   }
// }