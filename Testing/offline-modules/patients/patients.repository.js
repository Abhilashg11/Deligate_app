// src/offline-modules/patients/patients.repository.js

import { db } from '../../database/db';
import * as Q from './patients.queries';

export async function createPatientsTable() {
  await db.execute(Q.CREATE_PATIENTS_TABLE);
}

export async function insertPatient(p) {
  console.log('Inserting patient into DB:', p);
  await db.execute(Q.INSERT_PATIENT, [
    p.local_id,
    p.server_id ?? null,
    p.first_name,
    p.last_name,
    p.middle_name ?? null,
    p.dob,
    p.gender,
    p.ma_number ?? null,
    p.status ?? "active",
    p.created_at,
    p.updated_at,
    p.sync_status
  ]);
}

export async function getAllPatients() {
  const result = await db.execute(Q.SELECT_ALL_PATIENTS);
  return result?.rows ?? [];
}

export async function getPatientById(id) {
  const result = await db.execute(Q.SELECT_PATIENT_BY_ID, [id]);
  return result?.rows?.[0] ?? null;
}

export async function updatePatient(patient) {
  await db.execute(Q.UPDATE_PATIENT, [
    patient.first_name,
    patient.last_name,
    patient.dob,
    patient.ma_number,
    patient.status,
    patient.middle_name,
    patient.gender,
    Date.now(),
    patient.local_id,
  ]);
}

export async function deleteAllPatients() {
  await db.execute(Q.DELETE_ALL_PATIENTS);
}

export async function updatePatientServerId(localId, serverId) {
  await db.execute(Q.UPDATE_SERVER_ID,[serverId, localId]
  );
}

export const clearDatabase = async () => {
  try {
    const result = await db.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );

    const tables = result?.rows;

    for (const { name } of tables || []) {
      await db.execute(`DROP TABLE IF EXISTS ${name}`);
      console.log(`Dropped table: ${name}`);
    }

    console.log('✅ All tables dropped successfully');
  } catch (error) {
    console.error('❌ Failed to drop tables:', error);
  }
};

export const listAllTables = () => {
  try {
    const result = db.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );

    // Extract names from the result array
    const tableNames = result?.rows?.map(row => row?.name);
    console.log('Tables in database:', tableNames);
    return tableNames;
  } catch (error) {
    console.error('Error listing tables:', error);
    return [];
  }
};
export const getTableInfo = async () => {
  console.log("Getting table info for 'patients'...");
  const result = await db.execute(`SELECT * FROM patients`);

  console.log('Table info result:', result);
};
