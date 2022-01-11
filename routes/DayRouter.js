const router = require("express").Router();
const DayToday = require("../controller/DaysController");

router.post("/add", DayToday.create);
router.post("/all", DayToday.getAll);
router.delete("/:id", DayToday.rm);

module.exports = router;
