const pool = require("../config/db");

const SuperAdminModel = {
  async findByUsername(username) {
    const { rows } = await pool.query(
      `SELECT * FROM super_admins WHERE username = $1 LIMIT 1`,
      [username]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM super_admins WHERE id = $1 LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },

  async create(username, hashedPassword) {
    const { rows } = await pool.query(
      `INSERT INTO super_admins (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
    );
    return rows[0];
  },
};

module.exports = SuperAdminModel;
