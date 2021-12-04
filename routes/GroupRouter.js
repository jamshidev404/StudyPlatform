const express  = require("express");
const router = express.Router();
const Group = require("../controller/GroupsController");

router.get("/status", Group.getStatusByAll),
router.post("/add", Group.create),
router.get("/all", Group.getAll),
router.get("/all/:id", Group.getOne), //
router.get("/group/:id", Group.getGroup),
router.get("/status/:id", Group.getStatus),

router.put("/:id", Group.updateOne),
router.delete("/:id", Group.rm);

module.exports = router;