const pool = require("../config/db");

const NotificationModel = {
  async create(data) {
    const { userId, category, title, body, complaintId } = data;
    const { rows } = await pool.query(
      `INSERT INTO notifications (user_id, category, title, body, complaint_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, category, title, body, complaintId || null]
    );
    return rows[0];
  },

  async insertMany(notifications) {
    if (!notifications.length) return [];

    const values = [];
    const placeholders = notifications.map((n, i) => {
      const base = i * 5;
      values.push(n.userId, n.category, n.title, n.body, n.complaintId || null);
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`;
    });

    const { rows } = await pool.query(
      `INSERT INTO notifications (user_id, category, title, body, complaint_id)
       VALUES ${placeholders.join(", ")} RETURNING *`,
      values
    );
    return rows;
  },

  async findByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  },

  // Deduplicated grouped list for admin view
  async findAllGrouped() {
    const { rows } = await pool.query(
      `SELECT DISTINCT ON (title, body, complaint_id, category)
         title, body, complaint_id AS "complaintId", category,
         MAX(created_at) OVER (PARTITION BY title, body, complaint_id, category) AS "createdAt"
       FROM notifications
       ORDER BY title, body, complaint_id, category, created_at DESC`
    );
    // Sort by createdAt desc
    rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM notifications WHERE id = $1 LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },

  async markAsRead(id) {
    const { rows } = await pool.query(
      `UPDATE notifications SET is_read = TRUE, read_at = NOW() WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0] || null;
  },

  async deleteAll() {
    const { rowCount } = await pool.query(`DELETE FROM notifications`);
    return { deletedCount: rowCount };
  },
};

module.exports = NotificationModel;
