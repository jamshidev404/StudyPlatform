const router = require("express").Router();
const Statitika = require("../controller/StatistikaController");

router.get("/all", Statitika.getAll);

module.exports = router;
