const express  = require("express");
const router = express.Router();
const Teacher = require("../controller/TeacherController");

router.post("/add", Teacher.create),
router.get("/all", Teacher.getAll),
router.get("/:id", Teacher.getOne),
router.put("/:id", Teacher.updateOne),
router.delete("/:id", Teacher.rm);

module.exports = router;