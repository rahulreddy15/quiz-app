import LocalSubmit from "../services/questions/local/submit-questions";

const getSubmit = (server = null, startDate, questionsData, questionAnswers) => {
    if (server) {
        // TODO:
        // implement
    } else {
        return LocalSubmit(startDate, questionsData, questionAnswers);
    }
};

export default getSubmit;
