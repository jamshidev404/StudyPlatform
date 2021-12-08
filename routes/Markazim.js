const router = require("express").Router()
const Markaz = require("../controller/Markazim");

router.post('/create', Markaz.adding);


module.exports = router;