// const pkg = require('pg');
// const { Pool } = pkg;

// exports.pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "CM/DN"
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL:", process.env.DB_NAME);
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL connection error:", err);
  process.exit(1);
});

module.exports = { pool };