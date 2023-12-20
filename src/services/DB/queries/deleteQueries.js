class DeleteQueries {
    // Hard code data for name of test
    test = {
        aptitude: 1,
        concentration: 2,
        logical: 3,
        reasoning: 4,
        spatial: 5
    };

    // Hard code data for type of test
    type = {
        checkbox: 1,
        radiobutton: 2
    };

    deleteQuestion (idQuestion) {
        throw new Error('It should be implemented');
    }

    deleteOptions (idQuestion) {
        throw new Error('It should be implemented');
    }
}

module.exports = DeleteQueries;
