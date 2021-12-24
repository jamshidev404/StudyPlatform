const router = require("express").Router();
const Cost = require("../controller/CostController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Cost.create);
router.post(
  "/all",
  protect,
  authorize("superadmin", "admin", "moderator"),
  Cost.getAll
);
router.get("/:id", Cost.getOne);
router.put("/:id", Cost.updateOne);
router.delete("/:id", Cost.rm);

module.exports = router;
