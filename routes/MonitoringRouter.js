const router = require("express").Router();
const Monitoring = require("../controller/MonitoringController");

router.post("/add", Monitoring.create);
router.get("/all", Monitoring.getAll);

module.exports = router;
