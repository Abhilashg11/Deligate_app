const crypto = require("crypto");
const pool = require("../config/db");

/**
 * Generates a 12-digit unique Admin ID.
 * First 3 digits: unique prefix (001–256)
 * Last 9 digits: random
 */
exports.generateAdminId = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT admin_profile_id FROM users WHERE is_admin = true AND admin_profile_id IS NOT NULL`
    );

    const usedPrefixes = new Set(
      rows
        .map((r) => r.admin_profile_id?.slice(0, 3))
        .filter((p) => p && /^\d{3}$/.test(p))
    );

    let prefix;
    for (let i = 1; i <= 256; i++) {
      const candidate = i.toString().padStart(3, "0");
      if (!usedPrefixes.has(candidate)) {
        prefix = candidate;
        break;
      }
    }

    if (!prefix) throw new Error("No available admin prefixes left (1–256 exhausted)");

    const randomPart = crypto.randomInt(0, 999999999).toString().padStart(9, "0");
    return `${prefix}${randomPart}`;
  } catch (err) {
    console.error("generateAdminId error:", err);
    throw new Error("Failed to generate admin ID");
  }
};

/**
 * Generates a 13-digit Validator ID linked to the admin.
 * First 4 chars from admin ID + 9 random digits.
 */
exports.generateValidatorId = (adminId = "") => {
  const adminPrefix = adminId
    ? adminId.slice(0, 4)
    : Math.floor(1000 + Math.random() * 9000).toString();
  const randomPart = crypto.randomInt(100000000, 999999999);
  return `${adminPrefix}${randomPart}`;
};
