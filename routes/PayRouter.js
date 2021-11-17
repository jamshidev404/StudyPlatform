const express  = require("express");
const router = express.Router();
const Pay = require("../controller/PayController");

router.post("/add", Pay.create),
router.get("/all", Pay.getAll),
router.get("/:id", Pay.getOne),
router.put("/:id", Pay.updateOne),
router.delete("/:id", Pay.rm);

module.exports = router;