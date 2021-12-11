const router = require("express").Router();
const SuperAdmin = require("../controller/SuperAdmin");

router.post("/add", SuperAdmin.create),
  router.post("/login", SuperAdmin.login),
  router.get("/all", SuperAdmin.getAll),
  router.get("/:id", SuperAdmin.getOne),
  router.put("/:id", SuperAdmin.updateOne),
  router.delete("/:id", SuperAdmin.rm);

module.exports = router;
