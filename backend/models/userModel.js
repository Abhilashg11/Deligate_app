const pool = require("../config/db");

const UserModel = {
  // --------------------------------------------------
  // Find user by ID (joins expo tokens as array)
  // --------------------------------------------------
  async findById(id) {
    const { rows } = await pool.query(
      `SELECT u.*, 
        COALESCE(array_agg(e.token) FILTER (WHERE e.token IS NOT NULL), '{}') AS "expoPushTokens"
       FROM users u
       LEFT JOIN expo_push_tokens e ON e.user_id = u.id
       WHERE u.id = $1
       GROUP BY u.id`,
      [id]
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Find user by email
  // --------------------------------------------------
  async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT u.*, 
        COALESCE(array_agg(e.token) FILTER (WHERE e.token IS NOT NULL), '{}') AS "expoPushTokens"
       FROM users u
       LEFT JOIN expo_push_tokens e ON e.user_id = u.id
       WHERE u.user_email = $1
       GROUP BY u.id`,
      [email]
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Find one user by arbitrary filter object
  // Supported keys: user_email, admin_profile_id, validator_profile_id,
  //                 reset_token, is_admin, is_validator
  // --------------------------------------------------
  async findOne(filter) {
    const keys = Object.keys(filter);
    const values = Object.values(filter);
    const conditions = keys.map((k, i) => `${k} = $${i + 1}`).join(" AND ");

    const { rows } = await pool.query(
      `SELECT u.*, 
        COALESCE(array_agg(e.token) FILTER (WHERE e.token IS NOT NULL), '{}') AS "expoPushTokens"
       FROM users u
       LEFT JOIN expo_push_tokens e ON e.user_id = u.id
       WHERE ${conditions}
       GROUP BY u.id
       LIMIT 1`,
      values
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Find all users matching a filter
  // --------------------------------------------------
  async find(filter = {}) {
    const keys = Object.keys(filter);
    const values = Object.values(filter);

    let whereClause = "";
    if (keys.length > 0) {
      const conditions = keys.map((k, i) => `u.${k} = $${i + 1}`).join(" AND ");
      whereClause = `WHERE ${conditions}`;
    }

    const { rows } = await pool.query(
      `SELECT u.*, 
        COALESCE(array_agg(e.token) FILTER (WHERE e.token IS NOT NULL), '{}') AS "expoPushTokens"
       FROM users u
       LEFT JOIN expo_push_tokens e ON e.user_id = u.id
       ${whereClause}
       GROUP BY u.id
       ORDER BY u.created_at DESC`,
      values
    );
    return rows;
  },

  // --------------------------------------------------
  // Create a new user
  // --------------------------------------------------
  async create(data) {
    const {
      user_name, user_email, user_password, user_dob, user_phonenumber,
      user_country, user_state, user_pincode, aadhaar_number,
      is_admin = false, is_validator = false, is_admin_active = false,
      is_validator_active = false, first_login = null, admin_profile_id = null,
      validator_profile_id = null, validator_owner_id = null, location = null,
      category = null,
    } = data;

    const { rows } = await pool.query(
      `INSERT INTO users (
        user_name, user_email, user_password, user_dob, user_phonenumber,
        user_country, user_state, user_pincode, aadhaar_number,
        is_admin, is_validator, is_admin_active, is_validator_active,
        first_login, admin_profile_id, validator_profile_id, validator_owner_id,
        location, category
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
      RETURNING *`,
      [
        user_name, user_email, user_password, user_dob || null, user_phonenumber || null,
        user_country || null, user_state || null, user_pincode || null, aadhaar_number || null,
        is_admin, is_validator, is_admin_active, is_validator_active,
        first_login, admin_profile_id, validator_profile_id, validator_owner_id,
        location, category,
      ]
    );
    return rows[0];
  },

  // --------------------------------------------------
  // Update user by ID
  // --------------------------------------------------
  async updateById(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    if (keys.length === 0) return null;

    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
    values.push(id);

    const { rows } = await pool.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Delete user by ID
  // --------------------------------------------------
  async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Update many (e.g. deactivate all validators of an admin)
  // --------------------------------------------------
  async updateMany(filter, data) {
    const filterKeys = Object.keys(filter);
    const filterValues = Object.values(filter);
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);

    const setClause = dataKeys.map((k, i) => `${k} = $${i + 1}`).join(", ");
    const whereClause = filterKeys
      .map((k, i) => `${k} = $${dataValues.length + i + 1}`)
      .join(" AND ");

    const { rowCount } = await pool.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE ${whereClause}`,
      [...dataValues, ...filterValues]
    );
    return { modifiedCount: rowCount };
  },

  // --------------------------------------------------
  // Expo Push Token helpers
  // --------------------------------------------------
  async addPushToken(userId, token) {
    await pool.query(
      `INSERT INTO expo_push_tokens (user_id, token) VALUES ($1, $2) ON CONFLICT (token) DO NOTHING`,
      [userId, token]
    );
  },

  async removePushToken(token) {
    await pool.query(`DELETE FROM expo_push_tokens WHERE token = $1`, [token]);
  },

  async getPushTokens(userId) {
    const { rows } = await pool.query(
      `SELECT token FROM expo_push_tokens WHERE user_id = $1`,
      [userId]
    );
    return rows.map((r) => r.token);
  },
};

module.exports = UserModel;
