const express = require("express");
const router = express.Router();
const Pay = require("../controller/PayController");

router.post("/add", Pay.create),
  router.post("/all", Pay.getAll),
  router.post("/by", Pay.getOnes),
  router.get("/:id", Pay.getOne),
  router.put("/:id", Pay.updateOne),
  router.delete("/:id", Pay.rm);

module.exports = router;
