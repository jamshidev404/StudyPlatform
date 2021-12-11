const express  = require("express");
const router = express.Router();
const Teacher = require("../controller/TeacherController");

router.post("/add", Teacher.create),
router.post('/login', Teacher.login),
router.post('/all', Teacher.getTeacherAll),
router.post("/getall", Teacher.getAll),
router.get("/:id", Teacher.getOne),
router.put("/:id", Teacher.updateOne),
router.delete("/:id", Teacher.rm);

module.exports = router;