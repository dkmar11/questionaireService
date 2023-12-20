/* eslint-disable no-useless-constructor */
/* eslint-disable no-tabs */

const DeleteQueriesMysql = require('../../src/services/DB/queries/deleteQueriesMysql');

const deleteQueries = new DeleteQueriesMysql();
// Test for method deleteQuestion
describe('Tests for delete questions and options method ', () => {
    test('deleteQuestion method generates the correct query', () => {
        const questionId = 1;
        const expectedQuery = 'DELETE FROM questions WHERE IDQuestions = 1;';
        const deleteQuestionQuery = deleteQueries.deleteQuestion(questionId);
        expect(deleteQuestionQuery).toEqual(expectedQuery);
    });

    // Test for method deleteOptions
    test('deleteOptions method generates the correct query', () => {
        const optionId = 2;
        const expectedQuery = 'DELETE FROM options WHERE IDQuestions = 2;';
        const deleteOptionsQuery = deleteQueries.deleteOptions(optionId);
        expect(deleteOptionsQuery).toEqual(expectedQuery);
    });
});
