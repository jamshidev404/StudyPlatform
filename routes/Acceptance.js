const express = require("express");
const router = express.Router();
const Qabulxona = require("../controller/Acceptance");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Qabulxona.create);
router.post(
  "/all",
  protect,
  authorize("superadmin", "admin", "moderator"),
  Qabulxona.getAll
),
  router.get("/:id", Qabulxona.getOne),
  router.put("/:id", Qabulxona.updateOne),
  router.delete("/:id", Qabulxona.rm);

module.exports = router;
