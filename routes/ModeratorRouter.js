const express = require("express");
const router = express.Router();
const Moderator = require("../controller/ModeratorController");

router.post("/add", Moderator.create),
  router.post("/all", Moderator.getAll),
  router.post("/me", Moderator.me),
  router.get("/:id", Moderator.getOne),
  router.put("/:id", Moderator.updateOne),
  router.delete("/:id", Moderator.rm);

module.exports = router;
