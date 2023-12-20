const express = require('express');
const QuestionsController = require('../controllers/questionController');
const router = express.Router();

const questionsController = new QuestionsController();

// defines routes for questionsController
router.get('/:id', questionsController.getQuestion);
router.post('/', questionsController.setQuestion);
router.delete('/:id', questionsController.removeQuestion);

module.exports = router;
