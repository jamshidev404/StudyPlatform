const express = require("express");
const router = express.Router();
const Elon = require("../controller/AdController");

router.post("/add", Elon.create),
  router.post("/all", Elon.getAll),
  router.get("/:id", Elon.getOne),
  router.put("/:id", Elon.updateOne),
  router.delete("/:id", Elon.rm);

module.exports = router;
