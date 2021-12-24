const router = require("express").Router();
const Accounting = require("../controller/AccountingController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Accounting.create);
router.post(
  "/all",
  protect,
  authorize("superadmin", "admin", "moderator"),
  Accounting.getAll
);
router.get("/:id", Accounting.getOne);
router.put("/:id", Accounting.updateOne);
router.delete("/:id", Accounting.rm);

module.exports = router;
