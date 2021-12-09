const express  = require("express");
const router = express.Router();
const Teacher = require("../controller/TeacherController");

router.post("/add", Teacher.create),
router.post('/login', Teacher.login),
router.post('/getall', Teacher.getAllOne),
router.get("/all", Teacher.getAll),
router.get("/:id", Teacher.getOne),
router.get("/get/:id", Teacher.getOneTeacher),
router.put("/:id", Teacher.updateOne),
router.delete("/:id", Teacher.rm);

module.exports = router;