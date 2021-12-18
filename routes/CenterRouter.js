const router = require("express").Router();
const Markaz = require("../controller/CenterController");
const { protect, authorize } = require("../middleware/auth");
const { asyncs } = require("../middleware/async");

router.post("/add", Markaz.create);
router.get("/all", Markaz.getAll);
router.get("/:id", Markaz.getOne);
router.put("/:id", Markaz.updateOne);
router.delete("/:id", Markaz.rm);

module.exports = router;
