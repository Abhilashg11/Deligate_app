import { db } from './db';
import { CREATE_PATIENTS_TABLE } from '../offline-modules/patients/patients.queries';
import { CREATE_SYNC_QUEUE_TABLE } from '../offline-modules/offline-sync/offline-sync.queries';
import { createPatientsTable } from '../offline-modules/patients/patients.repository';
import { createSyncQueueTable } from '../offline-modules/offline-sync/offline-sync.repository';
import { createStaffTable } from '../offline-modules/staff/staff.repository';

export async function runMigrations() {
  await createSyncQueueTable()
  await createPatientsTable()
  await createStaffTable();

  console.log('Migrations completed');
  // await db.execute(CREATE_NURSES_TABLE);
  // await db.execute(CREATE_CASES_TABLE);
}
