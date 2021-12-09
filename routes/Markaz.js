const router = require("express").Router()
const Markaz = require("../controller/Markaz");

router.post('/add', Markaz.adding);
router.get('/all', Markaz.getAll);
router.get('/:id', Markaz.getOne);
router.put('/:id', Markaz.updateOne);
router.delete('/:id', Markaz.rm);


module.exports = router;