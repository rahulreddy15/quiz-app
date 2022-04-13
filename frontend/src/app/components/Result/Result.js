import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { Navigate } from 'react-router-dom';
import addCssTransition from "../../utils/css-transition";
import questionStyle from "./result-style";
import theme from "../../styles/theme";

class Result extends React.Component {

    redirectHome = () => {
        return <Navigate to="/" />;
    }

    render() {
        const { classes } = this.props;
        console.log(this.props);
        return (
            <MuiThemeProvider theme={theme}>
                {addCssTransition(
                    <div>
                        <pre className={classes.resultParagraph}>
                            Number Of Questions Asked: {this.props.result.n_questions}
                        </pre>
                        <pre className={classes.resultParagraph}>
                            Number Of Questions Answered: {this.props.result.answered}
                        </pre>
                        <pre className={classes.resultParagraph}>
                            Number Of Correct Answers: {this.props.result.correctAnswers}
                        </pre>
                        <pre className={classes.resultParagraph}>
                            Number Of Incorrect Answers: {this.props.result.answered - this.props.result.correctAnswers}
                        </pre>
                        <pre className={classes.resultParagraph}>
                            Percentage Correct: {this.props.result.correctAnswers / this.props.result.answered * 100}%
                        </pre>
                        <pre className={classes.resultParagraph}>
                            Time Elapsed: {this.props.result.quizTime} seconds
                        </pre>

                        <Button
                            variant="contained"
                            className={classes.resetButton}
                            onClick={this.props.tryAgainPressed}
                            color="secondary"
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.resetButton}
                            onClick={this.redirectHome}
                            color="secondary"
                        >
                            Go Home
                        </Button>
                    </div>
                )}
            </MuiThemeProvider>
        );
    }
}

export default withStyles(questionStyle)(Result);
