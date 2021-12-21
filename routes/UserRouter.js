const express = require("express");
const router = express.Router();
const User = require("../controller/UserController");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", protect, authorize("superadmin", "admin"), User.create);
router.post("/login", User.login);
router.get("/me", User.me);
router.get("/all", protect, authorize("superadmin", "admin"), User.getAll);
router.get("/:id", protect, authorize("superadmin", "admin"), User.getOne);
router.put("/:id", protect, authorize("superadmin", "admin"), User.updateOne);
router.delete(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  User.deleteOne
);

module.exports = router;
