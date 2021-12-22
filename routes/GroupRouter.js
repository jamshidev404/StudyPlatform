const express = require("express");
const router = express.Router();
const Group = require("../controller/GroupsController");
const { protect, authorize } = require("../middleware/auth");

router.post("/status", Group.getStatusByAll),
  router.post("/add", Group.create),
  router.post(
    "/all",
    protect,
    authorize("superadmin", "admin", "moderator"),
    Group.getAll
  ),
  router.get("/:id", Group.getGroup),
  router.get("/pupil/:id", Group.getPupil),
  router.get("/teacher/:id", Group.teacherGroups), //o'qituvchi guruhlarini olish
  router.get("/science/:id", Group.scienceStatus), //guruhlar statuslari bilan olish
  router.get("/status/:id", Group.getStatus), // id bo'yicha faqat bittasini olish, alohida
  router.get("/get/status/:id", Group.getGroupStatus),
  router.put("/update/status/:id", Group.updateStatus), //gruppa statusini o'zgartirish
  router.put("/:id", Group.updateOne),
  router.delete("/:id", Group.rm);

module.exports = router;
