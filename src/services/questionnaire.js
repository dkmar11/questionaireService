const MySQLDataBase = require('./DB/mySQLDataBase');
const dotenv = require('dotenv');
const GetQueriesMysql = require('./DB/queries/getQueriesMysql');
dotenv.config();

class Questionnaire {
    #configbd = {
        host: process.env.HOST_DATA_BASE,
        user: process.env.USER_DATA_BASE,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DB_PORT
    };

    /**
* gets a Questionnaire to db
* @param {string} test - it should be the name of the test which you want to get
* @returns {object} - the Questionnaire
*/
    async getQuestionnaire (test) {
        const db = new MySQLDataBase(this.#configbd);
        const getCommand = new GetQueriesMysql();
        db.connect();
        const response = [];
        const questions = await db.execute(getCommand.getQuestionnaire(test));
        let options;
        for (let index = 0; index < questions.length; index++) {
            options = await db.execute(getCommand.getOptions(questions[index].IDQuestions));
            response.push({
                ...questions[index],
                options
            });
        }
        db.disconnect();
        return response;
    }
}
module.exports = Questionnaire;
