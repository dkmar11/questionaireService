const Question = require('../services/question');
const loggerService = require('../../loggerService');

class QuestionController {
    // gets a question by ID from DB
    async getQuestion (req, res) {
        try {
            const idQuestion = req.params.id;

            // Validate input
            if (!idQuestion) {
                return res.status(400).json({
                    error: 'BAD_REQUEST',
                    message: 'Question ID is required'
                });
            }

            const question = await new Question().getQuestion(idQuestion);
            res.status(200).json(question);
        } catch (error) {
            loggerService.info(`Error getting question: ${error.message}`, error);
            
            const statusCode = error.errorCode || 500;
            const errorType = error.type || 'INTERNAL_SERVER_ERROR';
            const errorMessage = error.message || 'An unexpected error occurred';

            res.status(statusCode).json({
                error: errorType,
                message: errorMessage
            });
        }
    }

    // sets a question on a DB
    async setQuestion (req, res) {
        try {
            // Validate input
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    error: 'BAD_REQUEST',
                    message: 'Request body is required'
                });
            }

            const question = await new Question().setQuestion(req.body);
            res.status(200).json({
                message: 'the question was saved',
                ...question
            });
        } catch (error) {
            loggerService.info(`Error setting question: ${error.message}`, error);
            
            const statusCode = error.errorCode || 500;
            const errorType = error.type || 'INTERNAL_SERVER_ERROR';
            const errorMessage = error.message || 'An unexpected error occurred';

            res.status(statusCode).json({
                error: errorType,
                message: errorMessage
            });
        }
    }

    // removes a question by ID from DB
    async removeQuestion (req, res) {
        try {
            const idQuestion = req.params.id;

            // Validate input
            if (!idQuestion) {
                return res.status(400).json({
                    error: 'BAD_REQUEST',
                    message: 'Question ID is required'
                });
            }

            const questions = await new Question().removeQuestion(idQuestion);
            res.status(200).json(questions);
        } catch (error) {
            loggerService.info(`Error removing question: ${error.message}`, error);
            
            const statusCode = error.errorCode || 500;
            const errorType = error.type || 'INTERNAL_SERVER_ERROR';
            const errorMessage = error.message || 'An unexpected error occurred';

            res.status(statusCode).json({
                error: errorType,
                message: errorMessage
            });
        }
    }
}

module.exports = QuestionController;
