const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUser,
  // deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

console.log({ getAllUsers });

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", protect, updateUser);

module.exports = router;
