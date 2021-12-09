const express  = require("express");
const router = express.Router();
const Science = require("../controller/ScienceController");

router.post("/add", Science.create),
router.post("/all", Science.getAll),
router.get("/:id", Science.getOne),
router.get("/get/:id", Science.getScience),
router.put("/:id", Science.updateOne),
router.delete("/:id", Science.rm);

module.exports = router;