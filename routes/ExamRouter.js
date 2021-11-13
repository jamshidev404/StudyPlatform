const express = require('express');
const router = express.Router();
const Exam = require('../controller/ExamController');

router.post('/add', Exam.create),
router.get('/all', Exam.getAll),
router.get('/:id', Exam.me),
router.put('/:id', Exam.updateOne),
router.delete('/:id', Exam.rm);

module.exports = router;