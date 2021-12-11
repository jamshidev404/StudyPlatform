const express = require("express");
const router = express.Router();
const Group = require("../controller/GroupsController");

router.post("/status", Group.getStatusByAll),
  router.post("/add", Group.create),
  router.post("/all", Group.getAll),
  router.get("/all/:id", Group.getOne),
  router.get("/:id", Group.getGroup),
  router.get("/status/:id", Group.getStatus),
  router.get("/get/status/:id", Group.getGroupStatus),
  router.put("/update/status/:id", Group.updateStatus),
  router.put("/:id", Group.updateOne),
  router.delete("/:id", Group.rm);

module.exports = router;
