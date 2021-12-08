const router = require("express").Router()
const Markaz = require("../controller/Markazim");

router.post('/add', Markaz.adding);


module.exports = router;