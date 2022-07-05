const express = require("express");
const router = express.Router();
const User = require("../controller/UserController");
const { protect, authorize } = require("../middleware/auth");

router.post(
  "/add",
  // protect,
   authorize("superadmin", "admin", "moderator"),
  User.create
);
router.post("/login", User.login);
router.get("/me", User.me);
router.get(
  "/all",
  // protect,
   authorize("superadmin", "admin", "moderator"),
  User.getAll
);
router.post("/who", User.getUserForPay);
router.get("/:id", User.getOne);
router.put("/status/:id", User.updateStatus);
router.put("/:id", User.updateOne);
router.delete("/:id", User.deleteOne);

module.exports = router;
