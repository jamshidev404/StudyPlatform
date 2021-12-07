const express  = require("express");
const router = express.Router();
const Center = require("../controller/CenterController");

router.post("/add", Center.create),
router.post("/login", Center.login),
router.get("/all", Center.getAll),
router.get("/:id", Center.getOne),
router.put("/:id", Center.updateOne),
router.delete("/:id", Center.rm);

module.exports = router;