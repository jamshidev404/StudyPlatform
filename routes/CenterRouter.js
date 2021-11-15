const express  = require("express");
const router = express.Router();
const Center = require("../controller/CenterController");

router.post("/add", Center.create),
router.put("/:id", Center.updateOne),
// router.get("/all", Center.getAll),
// router.get("/:id", Center.me),
// router.delete("/:id", Center.rm);

module.exports = router;