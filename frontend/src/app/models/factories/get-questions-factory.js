import LocalQuestions from "../services/questions/local/get-questions";

const getQuestions = (server = null, data) => {
    if (server) {
        // TODO:
        // implement
    } else {
        return LocalQuestions(data);
    }
};

export default getQuestions;
