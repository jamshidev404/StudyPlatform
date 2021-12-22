const express = require("express");
const router = express.Router();
const Pay = require("../controller/PayController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Pay.create),
  router.post(
    "/all",
    protect,
    authorize("superadmin", "admin", "moderator"),
    Pay.getAll
  ),
  router.get("/by/:id", Pay.getOnes),
  router.get("/:id", Pay.getOne),
  router.put("/:id", Pay.updateOne),
  router.delete("/:id", Pay.rm);

module.exports = router;
