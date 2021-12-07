const router = require('express').Router();
const Director = require('../controller/DirectorController');

router.post("/add", Director.create),
router.post("/login", Director.login),
router.get("/all", Director.getAll),
router.get("/:id", Director.getOne),
router.put("/:id", Director.updateOne),
router.delete("/:id", Director.rm);

module.exports = router;