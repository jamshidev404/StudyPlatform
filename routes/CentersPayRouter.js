const express = require("express");
const router = express.Router();
const CenterPay = require("../controller/CentersPayController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", CenterPay.create),
  router.get("/all", protect, authorize("superadmin"), CenterPay.getAll),
  router.get("/by/:id", CenterPay.getOnes),
  router.get("/:id", CenterPay.getOne),
  router.put("/:id", CenterPay.updateOne),
  router.delete("/:id", CenterPay.rm);

module.exports = router;
