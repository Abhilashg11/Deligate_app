import { db } from './db';
import { CREATE_PATIENTS_TABLE } from '../offline-modules/patients/patients.queries';
import { CREATE_SYNC_QUEUE_TABLE } from '../offline-modules/offline-sync/offline-sync.queries';


export async function runMigrations() {
  await db.execute(CREATE_PATIENTS_TABLE);
  await db.execute(CREATE_SYNC_QUEUE_TABLE);
  console.log('Migrations completed');
  // await db.execute(CREATE_NURSES_TABLE);
  // await db.execute(CREATE_CASES_TABLE);
}
