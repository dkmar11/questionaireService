/* eslint-disable no-useless-constructor */
/* eslint-disable no-tabs */

const GetQueries = require('./getQueries');
const QueriesExceptions = require('../../../exceptions/queriesExceptions');
class GetQueriesMysql extends GetQueries {
    constructor () {
        super();
    }

    /**
	* Returns a query to get a question
	* @param {string} idQuestion - it should be the ID of the question which you want to get
	* @returns {string} - the query to get a question
	*/
    getQuestion (idQuestion) {
        try {

            return `SELECT Question, ImgScr, test.nombre as test, type.nombre as type, answer FROM questions
            INNER JOIN test ON questions.IDTest = test.IDTest
            INNER JOIN type ON questions.IDType = type.IDType
            WHERE IDQuestions = ${idQuestion};`;
        } catch (error) {
            throw new QueriesExceptions(error.message, 500, 'get query error');
        }
    }

    /**
	* Returns a query to get a option
	* @param {string} idQuestion - it should be the ID question for a options group
	* @returns {string} - the query to get a option
	*/
    getOptions (idQuestion) {
        try {
            return `SELECT Label, Value, ImgSrc FROM options WHERE IDQuestions = ${idQuestion};`;
        } catch (error) {
            throw new QueriesExceptions(error.message, 500, 'get query error');
        }
    }

    /**
	* Returns a query to get a Questionnaire
	* @param {string} test - it should be the name of the test which you want to get
	* @returns {string} - the query to get a Questionnaire
	*/
    getQuestionnaire (test) {
        try {
            const IDTest = this.test[test];
            return (` SELECT questions.IDQuestions as IDQuestions, questions.Question, questions.ImgScr, test.nombre AS test, type.nombre as type, questions.Answer
            from questions
           INNER JOIN test ON questions.IDTest = test.IDTest
           INNER JOIN type ON questions.IDType = type.IDType
           WHERE questions.IDTest = ${IDTest};`);
        } catch (error) {
            throw new QueriesExceptions(error.message, 500, 'get query error');
        }
    }
}

module.exports = GetQueriesMysql;
