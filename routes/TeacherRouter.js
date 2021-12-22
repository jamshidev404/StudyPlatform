const express = require("express");
const router = express.Router();
const Teacher = require("../controller/TeacherController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Teacher.create),
  router.post("/login", Teacher.login),
  router.post(
    "/all",
    protect,
    authorize("superadmin", "admin", "moderator", "teacher"),
    Teacher.getTeacherAll
  ),
  router.post("/getall", protect, authorize("superadmin"), Teacher.getAll),
  router.get("/getGroups/:id", Teacher.teacherGroups),
  router.get("/:id", Teacher.getOne),
  router.put("/:id", Teacher.updateOne),
  router.delete("/:id", Teacher.rm);

module.exports = router;
