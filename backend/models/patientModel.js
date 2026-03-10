const { pool } = require ("../config/db.js")

exports.createPatient = async (patient) => {
  const {
    local_id,
    first_name,
    last_name,
    dob,
    gender,
    created_at,
    updated_at
  } = patient;

  const query = `
    INSERT INTO patients (
      local_id, first_name, last_name, dob, gender, created_at, updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (local_id)
    DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      dob = EXCLUDED.dob,
      gender = EXCLUDED.gender,
      updated_at = EXCLUDED.updated_at
    RETURNING server_id;
  `;

  const values = [
    local_id,
    first_name,
    last_name,
    dob,
    gender,
    created_at,
    updated_at
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}