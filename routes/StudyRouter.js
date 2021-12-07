const express  = require("express");
const router = express.Router();
const Study = require("../controller/StudyController");

router.post("/add", Study.create),
router.get("/all", Study.getAll),
router.get("/:id", Study.getOne),
router.put("/:id", Study.updateOne),
router.delete("/:id", Study.rm);

module.exports = router;