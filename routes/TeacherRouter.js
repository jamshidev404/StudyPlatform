const express  = require("express");
const router = express.Router();
const Teacher = require("../controller/TeacherController");

router.post("/add", Group.create),
router.get("/all", Group.getAll),
router.get("/:id", Group.getOne),
router.put("/:id", Group.updateOne),
router.delete("/:id", Group.rm);

module.exports = router;