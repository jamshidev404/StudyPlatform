const express = require('express');
const router = express.Router();
const User = require('../controller/UserController');

router.post('/add', User.create);
router.post('/login', User.login);
router.get('/all', User.getAll);
router.get('/me', User.me);
router.get('/:id', User.getOne);
router.put('/:id', User.updateOne);
router.delete('/:id', User.deleteOne);

module.exports = router;