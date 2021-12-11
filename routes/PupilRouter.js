const express = require("express");
const router = express.Router();
const Pupil = require("../controller/PupilController");

router.post("/add", Pupil.create),
  router.post("/all", Pupil.getAll),
  router.post("/export/all", Pupil.ExportAll),
  router.get("/:id", Pupil.getOne),
  router.get("/pay/:id", Pupil.getPay),
  router.put("/:id", Pupil.updateOne),
  router.delete("/:id", Pupil.rm);

module.exports = router;
