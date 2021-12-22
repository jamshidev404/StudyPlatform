const express = require("express");
const router = express.Router();
const Exam = require("../controller/ExamController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Exam.create),
  router.get(
    "/all",
    protect,
    authorize("superadmin", "admin", "moderator"),
    Exam.getAll
  ),
  router.get("/:id", Exam.me),
  router.put("/:id", Exam.updateOne),
  router.delete("/:id", Exam.rm);

module.exports = router;
