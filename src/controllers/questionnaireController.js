const Questionnaire = require('../services/questionnaire');
const loggerService = require('../../loggerService');

class QuestionnaireController {
    // gets a Questionnaire for a test
    async getQuestionnaire (req, res) {
        const test = req.params.test;
        console.log(test);
        try {
            const questionnaire = await new Questionnaire().getQuestionnaire(test);
            res.status(200).json(questionnaire);
        } catch (error) {
            loggerService.info(error.message);
            res.status(error.errorCode).json({
                error: error.type
            });
        }
    }
}

module.exports = QuestionnaireController;
