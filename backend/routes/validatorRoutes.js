const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  createValidator,
  deactivateValidator,
  activateValidator,
  updateValidator,
} = require("../controllers/validatorController");

router.post("/validator/create", verifyToken, createValidator);
router.post("/validator/deactivate", verifyToken, deactivateValidator);
router.post("/validator/activate", verifyToken, activateValidator);
router.put("/validator/update", verifyToken, updateValidator);

module.exports = router;
