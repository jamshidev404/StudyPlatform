const router = require("express").Router();
const Statitika = require("../controller/StatistikaController");
const { protect, authorize } = require("../middleware/auth");

router.get(
  "/all",
  protect,
  authorize("superadmin", "admin", "moderator"),
  Statitika.getAll
);

module.exports = router;
