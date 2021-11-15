const express  = require("express");
const router = express.Router();
const Pupil = require("../controller/PupilController");

router.post("/add", Pupil.create),
router.get("/all", Pupil.getAll),
router.get("/:id", Pupil.getOne),
router.put("/:id", Pupil.updateOne),
router.delete("/:id", Pupil.rm);

module.exports = router;