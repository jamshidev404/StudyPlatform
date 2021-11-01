const express = require('express');
const router = express.Router();
const User = require('../controller/UserController');

router.post('/create', User.create);
router.post('/login', User.login);
router.get('/all', User.getAll);
router.get('/:id', User.me);
router.put('/:id', User.updateOne);
router.delete('/:id', User.deleteOne);

module.exports = router;