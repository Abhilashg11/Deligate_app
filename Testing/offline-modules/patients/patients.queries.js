// src/offline-modules/patients/patients.queries.js

export const CREATE_PATIENTS_TABLE = `
CREATE TABLE IF NOT EXISTS patients (
  local_id TEXT PRIMARY KEY,
  server_id TEXT UNIQUE,

  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,

  dob TEXT NOT NULL, -- store ISO string
  gender TEXT NOT NULL,

  ma_number TEXT,
  status TEXT DEFAULT 'active',

  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,

  sync_status TEXT DEFAULT 'pending' -- pending, synced, failed
);
`;

export const INSERT_PATIENT = `
  INSERT INTO patients (
    local_id, server_id,
    first_name, last_name, middle_name, dob, gender, ma_number, status,
    created_at, updated_at, sync_status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const SELECT_ALL_PATIENTS = `
  SELECT * FROM patients ORDER BY updated_at DESC;
`;

export const SELECT_PATIENT_BY_ID = `
    SELECT * FROM patients WHERE local_id = ?;
    `;

export const SELECT_PATIENT_BY_LOCAL_ID = `
  SELECT * FROM patients WHERE local_id = ?;
`;

export const UPDATE_PATIENT = `
  UPDATE patients
  SET
    first_name = ?,
    last_name = ?,
    middle_name = ?,
    dob = ?,
    gender = ?,
    ma_number = ?,
    status = ?,
    updated_at = ?,
    sync_status = 'pending'
  WHERE local_id = ?;
`;

export const DELETE_ALL_PATIENTS = `
  DELETE FROM patients;
`;


export const UPDATE_SERVER_ID = `
  UPDATE patients
  SET server_id = ?, sync_status = 'SYNCED'
  WHERE local_id = ?;
`;
