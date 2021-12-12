const express = require("express");
const router = express.Router();
const Qabulxona = require("../controller/Acceptance");

router.post("/add", Qabulxona.create),
  router.post("/all", Qabulxona.getAll),
  router.get("/:id", Qabulxona.me),
  router.put("/:id", Qabulxona.updateOne),
  router.delete("/:id", Qabulxona.rm);

module.exports = router;
