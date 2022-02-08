const express = require("express");
const router = express.Router();
const Science = require("../controller/ScienceController");
//const { protect, authorize } = require("../middleware/auth");

router.post("/add", Science.create),
  router.post(
    "/all",
    // protect,
    // authorize("superadmin", "admin", "moderator"),
    Science.getAll
  ),
  router.get("/alltest", Science.getAllTest),
  router.post("/getall", Science.getScienceAll),
  router.get("/:id", Science.getOne),
  router.get("/get/:id", Science.getScience),
  router.put("/:id", Science.updateOne),
  router.delete("/:id", Science.rm);

module.exports = router;
