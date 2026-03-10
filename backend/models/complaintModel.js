const pool = require("../config/db");

const ComplaintModel = {
  // --------------------------------------------------
  // Generate next complaint ID e.g. CE001
  // --------------------------------------------------
  async generateComplaintId() {
    const { rows } = await pool.query(
      `UPDATE counters SET seq = seq + 1 WHERE name = 'complaint' RETURNING seq`
    );
    const seq = rows[0].seq;
    return `CE${String(seq).padStart(3, "0")}`;
  },

  // --------------------------------------------------
  // Create a complaint (with initial progress entry)
  // --------------------------------------------------
  async create(data) {
    const { userId, title, description, grievanceType, locCoords } = data;

    const complaintId = await this.generateComplaintId();

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { rows } = await client.query(
        `INSERT INTO complaints (complaint_id, title, description, user_id, grievance_type, loc_coords)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [complaintId, title, description || null, userId, grievanceType || null, locCoords || null]
      );
      const complaint = rows[0];

      // Initial progress
      await client.query(
        `INSERT INTO complaint_progress (complaint_id, status, message)
         VALUES ($1, 'new', 'Complaint submitted by citizen')`,
        [complaint.id]
      );

      await client.query("COMMIT");
      return await this.findById(complaint.id);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  // --------------------------------------------------
  // Find complaint by DB id (with progress array)
  // --------------------------------------------------
  async findById(id) {
    const { rows } = await pool.query(
      `SELECT c.*,
        COALESCE(
          json_agg(
            json_build_object('status', p.status, 'message', p.message, 'date', p.date)
            ORDER BY p.date ASC
          ) FILTER (WHERE p.id IS NOT NULL),
          '[]'
        ) AS progress
       FROM complaints c
       LEFT JOIN complaint_progress p ON p.complaint_id = c.id
       WHERE c.id = $1
       GROUP BY c.id`,
      [id]
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Find all complaints (with progress)
  // --------------------------------------------------
  async findAll() {
    const { rows } = await pool.query(
      `SELECT c.*,
        COALESCE(
          json_agg(
            json_build_object('status', p.status, 'message', p.message, 'date', p.date)
            ORDER BY p.date ASC
          ) FILTER (WHERE p.id IS NOT NULL),
          '[]'
        ) AS progress
       FROM complaints c
       LEFT JOIN complaint_progress p ON p.complaint_id = c.id
       GROUP BY c.id
       ORDER BY c.created_at DESC`
    );
    return rows;
  },

  // --------------------------------------------------
  // Find complaints by user
  // --------------------------------------------------
  async findByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT c.*,
        COALESCE(
          json_agg(
            json_build_object('status', p.status, 'message', p.message, 'date', p.date)
            ORDER BY p.date ASC
          ) FILTER (WHERE p.id IS NOT NULL),
          '[]'
        ) AS progress
       FROM complaints c
       LEFT JOIN complaint_progress p ON p.complaint_id = c.id
       WHERE c.user_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return rows;
  },

  // --------------------------------------------------
  // Update complaint (status, message, rejectionReason)
  // --------------------------------------------------
  async update(id, { status, message, rejectionReason }) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      if (rejectionReason !== undefined) {
        await client.query(
          `UPDATE complaints SET rejection_reason = $1, updated_at = NOW() WHERE id = $2`,
          [rejectionReason, id]
        );
      }

      if (status) {
        await client.query(
          `INSERT INTO complaint_progress (complaint_id, status, message, date)
           VALUES ($1, $2, $3, NOW())`,
          [id, status, message || null]
        );
      }

      await client.query("COMMIT");
      return await this.findById(id);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  // --------------------------------------------------
  // Delete by id
  // --------------------------------------------------
  async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM complaints WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0] || null;
  },

  // --------------------------------------------------
  // Delete all
  // --------------------------------------------------
  async deleteAll() {
    const { rowCount } = await pool.query(`DELETE FROM complaints`);
    return { deletedCount: rowCount };
  },
};

module.exports = ComplaintModel;
