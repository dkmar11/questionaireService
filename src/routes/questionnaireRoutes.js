const express = require('express');
const QuestionnaireController = require('../controllers/questionnaireController');
const router = express.Router();

const questionnaireController = new QuestionnaireController();

// defines a route for questionnaireController
router.get('/:test', questionnaireController.getQuestionnaire);

module.exports = router;
