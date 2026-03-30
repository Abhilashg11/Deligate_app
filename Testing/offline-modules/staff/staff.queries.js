export const CREATE_STAFF_TABLE = `
CREATE TABLE IF NOT EXISTS staff (
  local_id TEXT PRIMARY KEY,
  server_id TEXT UNIQUE,

  fullname TEXT NOT NULL,

  dob TEXT NOT NULL, -- store ISO string
  gender TEXT ,

  role TEXT ,
  status TEXT DEFAULT 'active',

  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,

  sync_status TEXT DEFAULT 'pending' -- pending, synced, failed
);
`;

export const INSERT_STAFF = `
INSERT INTO staff (
  local_id, server_id,
  fullname, dob, gender, role, status,
  created_at, updated_at, sync_status
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const SELECT_ALL_STAFF = `
SELECT * FROM staff ORDER BY updated_at DESC;
`;

export const SELECT_STAFF_BY_ID = `
SELECT * FROM staff WHERE local_id = ?;
`;

export const SELECT_STAFF_BY_LOCAL_ID = `
SELECT * FROM staff WHERE local_id = ?;
`;

export const UPDATE_STAFF = `
UPDATE staff
SET
  fullname = ?,
  dob = ?,
  gender = ?,
  role = ?,
  status = ?,
  updated_at = ?,
  sync_status = ?
WHERE local_id = ?;
`;

export const DELETE_ALL_STAFF = `
DELETE FROM staff;
`;

export const UPDATE_STAFF_SERVER_ID = `
UPDATE staff
SET server_id = ?, sync_status = 'synced'
WHERE local_id = ?;
`;
