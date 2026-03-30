// src/offline-modules/offline-sync/offline-sync.repository.js

import { db } from "../../database/db";
import { getUUID } from "../../utils/uuid";
import {
  INSERT_SYNC_ITEM,
  SELECT_PENDING_SYNC,
  DELETE_SYNC_ITEM,
  INCREMENT_RETRY_COUNT,
  CREATE_SYNC_QUEUE_TABLE
} from "./offline-sync.queries";

export async function createSyncQueueTable() {
  await db.execute(CREATE_SYNC_QUEUE_TABLE);
}

export async function insertSyncItem({ table, recordId, action, payload }) {

  const result = await db.execute(INSERT_SYNC_ITEM, [
    getUUID(),                  // sync_queue row id (NOT local_id)
    table,
    recordId,                // patient.local_id
    action,
    JSON.stringify(payload),
    Date.now(),
    0,
    "pending"
  ]);
  console.log('Insert sync item result:', result);
}

export async function getPendingSyncItems() {
  const result = await db.execute(SELECT_PENDING_SYNC);
  console.log('Pending sync items:', result);
  return result?.rows;
}

export async function deleteSyncItem(id) {
  await db.execute(DELETE_SYNC_ITEM, [id]);
}

export async function incrementRetry(id) {
  await db.execute(INCREMENT_RETRY_COUNT, [id]);
}

export async function getAllSyncQueue() {
  const result = await db.execute("SELECT * FROM sync_queue");
  console.log('All sync queue items:', result);
  return result?.rows;
}