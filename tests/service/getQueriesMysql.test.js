/* eslint-disable no-useless-constructor */
/* eslint-disable no-tabs */

const GetQueriesMysql = require('../../src/services/DB/queries/getQueriesMysql');

describe('GetQueriesMysql class test', () => {

    // Tests that getQuestion returns a valid query string. 
    it("test getQuestion method happy path", () => {
        const getQueriesMysql = new GetQueriesMysql();
        const idQuestion = 1;
        const expectedQuery = `SELECT Question, ImgScr, test.nombre as test, type.nombre as type, answer FROM questions
            INNER JOIN test ON questions.IDTest = test.IDTest
            INNER JOIN type ON questions.IDType = type.IDType
            WHERE IDQuestions = ${idQuestion};`;
        const result = getQueriesMysql.getQuestion(idQuestion);
        expect(result).toEqual(expectedQuery);
    });

    // Tests that getOptions returns a valid query string. 
    it("test getOptions method happy path", () => {
        const getQueriesMysql = new GetQueriesMysql();
        const idQuestion = 1;
        const expectedQuery = `SELECT Label, Value, ImgSrc FROM options WHERE IDQuestions = ${idQuestion};`;
        const result = getQueriesMysql.getOptions(idQuestion);
        expect(result).toEqual(expectedQuery);
    });

    // Tests that getQuestionnaire returns a valid query string. 
    it("test getQuestionnaire method happy path", () => {
        const getQueriesMysql = new GetQueriesMysql();
        const test = "test1";
        const expectedQuery = ` SELECT questions.IDQuestions as IDQuestions, questions.Question, questions.ImgScr, test.nombre AS test, type.nombre as type, questions.Answer
            from questions
           INNER JOIN test ON questions.IDTest = test.IDTest
           INNER JOIN type ON questions.IDType = type.IDType
           WHERE questions.IDTest = ${getQueriesMysql.test[test]};`;
        const result = getQueriesMysql.getQuestionnaire(test);
        expect(result).toEqual(expectedQuery);
    });
});
