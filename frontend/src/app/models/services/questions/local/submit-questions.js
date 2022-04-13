export default (startDate, questionsData, questionAnswers) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const endDate = new Date();
            const quizTime = (endDate.getTime() - startDate.getTime()) / 1000;
            let correctAnswers = 0;
            const n_questions = questionsData.length;
            const answered = questionAnswers.length

            for (let i = 0; i < questionsData.length; i++) {
                const correct = questionsData[i].correctAnswerIndex;
                const given = questionAnswers[i]+1;
                console.log(correct, given)

                if (correct == given) {
                    correctAnswers++;
                }
            }

            const requiredCorrectPercentage = 70;
            const questionsLength = questionsData.length;
            const pass = correctAnswers >= questionsLength * (requiredCorrectPercentage / 100);
            const result = {
                answered,
                n_questions,
                correctAnswers,
                pass,
                quizTime
            };

            resolve(result);
        }, 1000);
    });
};
