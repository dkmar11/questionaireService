/* eslint-disable no-tabs */
/* eslint-disable no-useless-constructor */

const DeleteQueries = require('./deleteQueries');
const QueriesExceptions = require('../../../exceptions/queriesExceptions');
class DeleteQueriesMysql extends DeleteQueries {
    constructor () {
        super();
    }

    /**
	* Returns a query to delete a question
	* @param {string} idQuestion - it should be the ID of the question which you want to delete
	* @returns {string} - the query to delete a question
	*/
    deleteQuestion (idQuestion) {
        try {
            return `DELETE FROM questions WHERE IDQuestions = ${idQuestion};`;
        } catch (error) {
            throw new QueriesExceptions(error.message, 500, 'delete query error');
        }
    }

    /**
	* Returns a query to delete a option
	* @param {string} idOption - it should be the ID of the option which you want to delete
	* @returns {string} - the query to delete a option
	*/

    deleteOptions (idQuestion) {
        try {
            return `DELETE FROM options WHERE IDQuestions = ${idQuestion};`;
        } catch (error) {
            throw new QueriesExceptions(error.message, 500, 'delete query error');
        }
    }
}

module.exports = DeleteQueriesMysql;
